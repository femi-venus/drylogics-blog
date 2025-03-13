const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const yaml = require('js-yaml');
const he = require('he');

const app = express();
const PORT = 5000;
const IMAGE_UPLOADS_DIR = path.join(__dirname, 'uploads');
const BLOGS_YAML_DIR = path.join(__dirname, 'blogs');
const INDEX_YAML_FILE = path.join(BLOGS_YAML_DIR, 'index.yml');
const CATEGORIES_YAML_FILE = path.join(BLOGS_YAML_DIR, 'categories.yml');

if (!fs.existsSync(IMAGE_UPLOADS_DIR)) fs.mkdirSync(IMAGE_UPLOADS_DIR);
if (!fs.existsSync(BLOGS_YAML_DIR)) fs.mkdirSync(BLOGS_YAML_DIR);
if (!fs.existsSync(CATEGORIES_YAML_FILE)) fs.writeFileSync(CATEGORIES_YAML_FILE, yaml.dump([]));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGE_UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(IMAGE_UPLOADS_DIR));

const getAllCategories = () => {
  if (!fs.existsSync(CATEGORIES_YAML_FILE)) return [];
  return yaml.load(fs.readFileSync(CATEGORIES_YAML_FILE, 'utf8')) || [];
};

const saveCategories = (categories) => {
  fs.writeFileSync(CATEGORIES_YAML_FILE, yaml.dump(categories));
};

// ================== CATEGORIES CRUD ================== //

// GET all categories
app.get('/api/categories', (req, res) => {
  if (!fs.existsSync(CATEGORIES_YAML_FILE)) return res.json([]);
  const categories = yaml.load(fs.readFileSync(CATEGORIES_YAML_FILE, 'utf8')) || [];
  res.json(categories);
});

// GET a single category by name
app.get('/api/categories/:category', (req, res) => {
  if (!fs.existsSync(CATEGORIES_YAML_FILE)) return res.status(404).json({ message: 'Category not found' });
  const categories = yaml.load(fs.readFileSync(CATEGORIES_YAML_FILE, 'utf8')) || [];
  const category = categories.find(cat => cat.category === req.params.category);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
});

// CREATE a new category
app.post('/api/categories', (req, res) => {
  try {
    const { category, defaultTags } = req.body;
    if (!category) return res.status(400).json({ message: 'Category name is required' });

    let categories = [];
    if (fs.existsSync(CATEGORIES_YAML_FILE)) {
      const fileContent = fs.readFileSync(CATEGORIES_YAML_FILE, 'utf8');
      categories = fileContent ? yaml.load(fileContent) || [] : [];
    }

    // Ensure `categories` is an array
    if (!Array.isArray(categories)) categories = [];

    // Check if category already exists
    const existingIndex = categories.findIndex(cat => cat.category === category);
    if (existingIndex !== -1) {
      categories[existingIndex].defaultTags = Array.isArray(defaultTags)
        ? defaultTags.map(tag => tag.trim())
        : typeof defaultTags === 'string'
        ? defaultTags.split(',').map(tag => tag.trim())
        : [];
    } else {
      categories.push({
        category,
        defaultTags: Array.isArray(defaultTags)
          ? defaultTags.map(tag => tag.trim())
          : typeof defaultTags === 'string'
          ? defaultTags.split(',').map(tag => tag.trim())
          : [],
      });
    }

    fs.writeFileSync(CATEGORIES_YAML_FILE, yaml.dump(categories));
    res.status(201).json({ message: 'Category saved successfully', category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// UPDATE an existing category
app.put('/api/categories/:category', (req, res) => {
  const categories = getAllCategories();
  const categoryIndex = categories.findIndex(c => c.category === req.params.category);

  if (categoryIndex === -1) return res.status(404).json({ message: 'Category not found' });

  categories[categoryIndex] = {
    category: req.body.category || categories[categoryIndex].category,
    defaultTags: req.body.defaultTags ? req.body.defaultTags.split(',').map(tag => tag.trim()) : categories[categoryIndex].defaultTags,
  };

  saveCategories(categories);
  res.json(categories[categoryIndex]);
});

// DELETE a category
app.delete('/api/categories/:category', (req, res) => {
  if (!fs.existsSync(CATEGORIES_YAML_FILE)) return res.status(404).json({ message: 'Category not found' });

  let categories = yaml.load(fs.readFileSync(CATEGORIES_YAML_FILE, 'utf8')) || [];
  const filteredCategories = categories.filter(cat => cat.category !== req.params.category);

  if (filteredCategories.length === categories.length) return res.status(404).json({ message: 'Category not found' });

  fs.writeFileSync(CATEGORIES_YAML_FILE, yaml.dump(filteredCategories));
  res.status(204).send();
});


// ================== BLOG CRUD (Already in Place) ================== //

const sanitizeTitle = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
const generateYamlFilename = (title, date) => `${sanitizeTitle(title)}-${date}.yml`;

const saveBlogAsYaml = (blog) => {
  const publishDate = blog.createdAt.split('T')[0];
  const filename = generateYamlFilename(blog.title, publishDate);
  const yamlContent = yaml.dump({
    title: blog.title,
    publishedBy: blog.publishedBy,
    publishedDate: blog.createdAt,
    tags: blog.tags || [],
    category: blog.category || null,
    content: `\n  ${blog.content.replace(/\n/g, '\n  ')}`,
    updatedDate: blog.updatedAt,
    deletedAt: blog.deletedAt || null,
    image: blog.image || null,
  });

  fs.writeFileSync(path.join(BLOGS_YAML_DIR, filename), yamlContent);
  return filename;
};


const getAllBlogs = () => {
  const files = fs.readdirSync(BLOGS_YAML_DIR).filter(file => file.endsWith('.yml') && file !== 'index.yml');
  return files.map(file => {
    const filePath = path.join(BLOGS_YAML_DIR, file);
    const content = yaml.load(fs.readFileSync(filePath, 'utf8'));
    return { ...content, yamlFilename: file };
  }).filter(blog => !blog.deletedAt);
};

const updateIndexYaml = (blogs) => {
  const indexData = blogs
    .filter(blog => blog.title && blog.yamlFilename && !blog.deletedAt)
    .map(blog => ({
      title: blog.title,
      publishedDate: blog.publishedDate,
      tags: blog.tags || [],
      filename: blog.yamlFilename,
      image: blog.image || null,
      category: blog.category || null,
    }));
  const yamlContent = yaml.dump(indexData);
  fs.writeFileSync(INDEX_YAML_FILE, yamlContent);
};



app.get('/api/blogs', (req, res) => {
  const blogs = getAllBlogs();
  
  const blogsWithPublishedBy = blogs.map(blog => ({
    ...blog,
    publishedBy: blog.publishedBy || 'Unknown Author',
  }));

  res.json(blogsWithPublishedBy);
});



app.get('/api/blogs/:filename', (req, res) => {
  const filename = `${req.params.filename}.yml`;
  const blogFilePath = path.join(BLOGS_YAML_DIR, filename);

  if (!fs.existsSync(blogFilePath)) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  try {
    const blogContent = yaml.load(fs.readFileSync(blogFilePath, 'utf8'));
    const plainTextContent = blogContent.content;

    res.json({ ...blogContent, content: plainTextContent });
  } catch (error) {
    console.error('Error in GET /api/blogs/:filename:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});


app.post('/api/blogs', upload.single('image'), (req, res) => {
  try {
    const newBlog = {
      title: req.body.title,
      content: req.body.content,
      publishedBy: req.body.publishedBy,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
      category: req.body.category || "Uncategorized",  // ✅ Fix: Add category
      image: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const yamlFilename = saveBlogAsYaml(newBlog);
    newBlog.yamlFilename = yamlFilename;

    const blogs = getAllBlogs();
    updateIndexYaml(blogs);

    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});


app.put('/api/blogs/:filename', upload.single('image'), (req, res) => {
  const blogFilePath = path.join(BLOGS_YAML_DIR, `${req.params.filename}.yml`);

  if (!fs.existsSync(blogFilePath)) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  const existingBlog = yaml.load(fs.readFileSync(blogFilePath, 'utf8'));
  const updatedBlog = {
    ...existingBlog,
    title: req.body.title,
    content: req.body.content,
    publishedBy: req.body.publishedBy,
    tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : existingBlog.tags,
    category: req.body.category || existingBlog.category || "Uncategorized",  // ✅ Fix: Update category
    image: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl || existingBlog.image,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(blogFilePath, yaml.dump(updatedBlog));

  const blogs = getAllBlogs();
  updateIndexYaml(blogs);

  res.json(updatedBlog);
});


app.delete('/api/blogs/:filename', (req, res) => {
  const blogFilePath = path.join(BLOGS_YAML_DIR, req.params.filename);
  
  if (!fs.existsSync(blogFilePath)) {
    return res.status(404).send('Blog not found');
  }

  try {
    // Read existing blog content
    const existingBlog = yaml.load(fs.readFileSync(blogFilePath, 'utf8'));
    
    // Update the blog with deletedAt timestamp
    const updatedBlog = {
      ...existingBlog,
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save the updated blog with deletedAt field
    fs.writeFileSync(blogFilePath, yaml.dump(updatedBlog));

    // Update the index (which will now exclude this deleted blog)
    const blogs = getAllBlogs();
    updateIndexYaml(blogs);

    res.status(200).json({ message: 'Blog successfully marked as deleted' });
  } catch (error) {
    console.error('Error in DELETE /api/blogs/:filename:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

app.get('/api/index', (req, res) => {
  if (fs.existsSync(INDEX_YAML_FILE)) {
    const fileContent = fs.readFileSync(INDEX_YAML_FILE, 'utf8');
    const indexData = yaml.load(fileContent);
    res.json(indexData);
  } else {
    res.status(404).send('Index file not found');
  }
});

// Add new endpoint to get all blogs including deleted ones (for admin purposes)
app.get('/api/blogs/all/including-deleted', (req, res) => {
  try {
    const files = fs.readdirSync(BLOGS_YAML_DIR).filter(file => file.endsWith('.yml') && file !== 'index.yml');
    const allBlogs = files.map(file => {
      const filePath = path.join(BLOGS_YAML_DIR, file);
      const content = yaml.load(fs.readFileSync(filePath, 'utf8'));
      return { ...content, yamlFilename: file };
    });

    res.json(allBlogs);
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Add endpoint to restore a deleted blog
app.post('/api/blogs/:filename/restore', (req, res) => {
  const blogFilePath = path.join(BLOGS_YAML_DIR, req.params.filename);
  
  if (!fs.existsSync(blogFilePath)) {
    return res.status(404).send('Blog not found');
  }

  try {
    // Read existing blog content
    const existingBlog = yaml.load(fs.readFileSync(blogFilePath, 'utf8'));
    
    // Remove deletedAt field and update timestamp
    const { deletedAt, ...restoredBlog } = existingBlog;
    const updatedBlog = {
      ...restoredBlog,
      updatedAt: new Date().toISOString(),
    };

    // Save the restored blog
    fs.writeFileSync(blogFilePath, yaml.dump(updatedBlog));

    // Update the index
    const blogs = getAllBlogs();
    updateIndexYaml(blogs);

    res.status(200).json({ message: 'Blog successfully restored', blog: updatedBlog });
  } catch (error) {
    console.error('Error restoring blog:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
