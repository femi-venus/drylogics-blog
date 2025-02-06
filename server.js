const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data', 'blogs.json');
const IMAGE_UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(IMAGE_UPLOADS_DIR)) {
  fs.mkdirSync(IMAGE_UPLOADS_DIR);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_UPLOADS_DIR); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(IMAGE_UPLOADS_DIR)); 
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    console.log(`Data file ${DATA_FILE} does not exist.`);
    return [];
  }
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return data ? JSON.parse(data) : []; 
  } catch (error) {
    console.error('Error reading or parsing data file:', error.message);
    return []; 
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get('/api/blogs', (req, res) => {
  const blogs = readData();
  res.json(blogs);
});

app.post('/api/blogs', upload.single('image'), (req, res) => {
  const blogs = readData();
  const newBlog = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    publishedBy: req.body.publishedBy,
    image: req.file ? `/uploads/${req.file.filename}` : null, 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  blogs.push(newBlog);
  writeData(blogs);
  res.status(201).json(newBlog);
});

app.put('/api/blogs/:id', upload.single('image'), (req, res) => {
  const blogs = readData();
  const index = blogs.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).send('Blog not found');

  const updatedBlog = {
    ...blogs[index],
    title: req.body.title,
    content: req.body.content,
    publishedBy: req.body.publishedBy,
    image: req.file ? `/uploads/${req.file.filename}` : blogs[index].image, 
    updatedAt: new Date().toISOString(),
  };

  blogs[index] = updatedBlog;
  writeData(blogs);
  res.json(updatedBlog);
});

app.delete('/api/blogs/:id', (req, res) => {
  let blogs = readData();
  blogs = blogs.filter(b => b.id != req.params.id);
  writeData(blogs);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
