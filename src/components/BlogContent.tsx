import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Toolbar, Grid, Card, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BlogCard from './BlogCard';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

type BlogPost = {
  id: number;
  image?: string;
  title: string;
  content: string;
  publishedBy: string;
  publishedAt: string;
  updatedAt: string;
};

function BlogContent() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<BlogPost[]>('http://localhost:5000/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
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
          backgroundColor: '808b96',
          '&:hover': {
            backgroundColor: '#999999',
          },
        }}
      >
        Create Blog
      </Button>

      <Grid container spacing={3} sx={{ marginTop: '60px' }}>
        {blogs.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <BlogCard
              image={post.image || ''}
              title={post.title}
              description={post.content.substring(0, 100) + '...'}
              createdBy={post.publishedBy}
              createdAt={post.publishedAt}
              updatedAt={post.updatedAt} id={post.id}            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BlogContent;
