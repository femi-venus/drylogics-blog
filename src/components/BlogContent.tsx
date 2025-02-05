import React from 'react';
import { Box, Typography, Button, Toolbar, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'How to Build a React App',
    description: 'Learn how to build a modern React app using hooks and functional components.',
    createdBy: 'John Doe',
    createdAt: '2025-01-10',
    updatedAt: '2025-02-05',
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Understanding JavaScript Closures',
    description: 'A deep dive into JavaScript closures and their practical use cases.',
    createdBy: 'Jane Smith',
    createdAt: '2025-01-15',
    updatedAt: '2025-02-01',
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Mastering CSS Grid',
    description: 'Explore the CSS Grid layout and how to create responsive designs.',
    createdBy: 'Alice Johnson',
    createdAt: '2025-01-20',
    updatedAt: '2025-02-03',
  },
];

function BlogContent() {
  const navigate = useNavigate();
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
        Blog
      </Typography>
      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate('/create')}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          backgroundColor: '#37474f',
          '&:hover': {
            backgroundColor: '#37474f',
          },
        }}
      >
        New Post
      </Button>
      
      <Grid container spacing={3} sx={{ marginTop: '60px' }}>
        {mockData.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BlogCard
              image={post.image}
              title={post.title}
              description={post.description}
              createdBy={post.createdBy}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogContent;
