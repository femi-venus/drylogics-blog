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

if (!fs.existsSync(IMAGE_UPLOADS_DIR)) fs.mkdirSync(IMAGE_UPLOADS_DIR);
if (!fs.existsSync(BLOGS_YAML_DIR)) fs.mkdirSync(BLOGS_YAML_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGE_UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(IMAGE_UPLOADS_DIR));

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
    content: `\n  ${blog.content.replace(/\n/g, '\n  ')}`, 
    updatedDate: blog.updatedAt,
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
  });
};

const updateIndexYaml = (blogs) => {
  const indexData = blogs.filter(blog => blog.title && blog.yamlFilename).map(blog => ({
    title: blog.title,
    publishedDate: blog.publishedDate,
    tags: blog.tags || [],
    filename: blog.yamlFilename,
  }));
  const yamlContent = yaml.dump(indexData);
  fs.writeFileSync(INDEX_YAML_FILE, yamlContent);
};

const convertHtmlToText = (html) => {
  if (!html) return '';
  let text = he.decode(html); 
  text = text.replace(/<br\s*\/?>/g, '\n')    
             .replace(/<\/p>/g, '\n\n')         
             .replace(/<[^>]+>/g, '')          
             .replace(/\n{3,}/g, '\n\n');   
  return text.trim();
};

app.get('/api/blogs', (req, res) => {
  const blogs = getAllBlogs();
  
  const blogsWithPublishedBy = blogs.map(blog => ({
    ...blog,
    publishedBy: blog.publishedBy || 'Unknown Author' 
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
    const plainTextContent = convertHtmlToText(blogContent.content);

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
      image: req.file ? `/uploads/${req.file.filename}` : null,
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
  console.log('Received filename:', req.params.filename); // Log the filename

  const blogFilePath = path.join(BLOGS_YAML_DIR, req.params.filename);
  console.log('Blog file path:', blogFilePath); // Log the full file path

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
    image: req.file ? `/uploads/${req.file.filename}` : existingBlog.image,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(blogFilePath, yaml.dump(updatedBlog)); // Save the updated blog content

  // Update the index
  const blogs = getAllBlogs();
  updateIndexYaml(blogs);

  res.json(updatedBlog); // Respond with updated blog data
});



app.delete('/api/blogs/:filename', (req, res) => {
  const blogFilePath = path.join(BLOGS_YAML_DIR, req.params.filename);
  if (!fs.existsSync(blogFilePath)) return res.status(404).send('Blog not found');

  fs.unlinkSync(blogFilePath);
  const blogs = getAllBlogs();
  updateIndexYaml(blogs);
  res.status(204).send();
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
