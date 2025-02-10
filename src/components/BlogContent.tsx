import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Toolbar, Grid, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BlogCard from './BlogCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export type BlogIndexEntry = {
  title: string;
  publishedDate: string;
  tags: string[];
  filename: string;
};

function BlogContent() {
  const [blogs, setBlogs] = useState<BlogIndexEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<BlogIndexEntry[]>('http://localhost:5000/api/index')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching index.yml:', error));
  }, []);



  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
        Blogs
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate('/create')}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          backgroundColor: '#808b96',
          '&:hover': {
            backgroundColor: '#999999',
          },
        }}
      >
        Create Blog
      </Button>
      <Grid container spacing={3} sx={{ marginTop: '60px' }}>
      {blogs.map((post) => (
      <BlogCard key={post.filename} title={post.title} publishedDate={post.publishedDate} tags={post.tags} filename={post.filename} />
      ))
    }
    </Grid>
    </Box>
  );
}

export default BlogContent;
