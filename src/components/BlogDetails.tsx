import React, { useState, useEffect } from 'react';
import { Box, Typography, Toolbar, CircularProgress, Chip, Stack, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


export type BlogDetailData = {
  title: string;
  publishedBy:string;
  publishedDate: string;
  updatedDate?: string;
  content: string;
  tags: string[];
};

function BlogDetail() {
  const { filename } = useParams<{ filename: string }>();
  const [blog, setBlog] = useState<BlogDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<BlogDetailData>(`http://localhost:5000/api/blogs/${filename}`)
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setLoading(false);
      });
  }, [filename]);


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Blog not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
      <Toolbar />
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
        {blog.title}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Published: {new Date(blog.publishedDate).toLocaleDateString()}
        </Typography>
        {blog.updatedDate && (
          <Typography variant="body2" color="textSecondary">
            (Updated: {new Date(blog.updatedDate).toLocaleDateString()})
          </Typography>
        )}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {blog.tags.map((tag, index) => (
          <Chip key={index} label={tag} size="small" sx={{ backgroundColor: '#e0e0e0' }} />
        ))}
      </Stack>

      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, mb: 3 }}>
        {blog.content}
      </Typography>

    </Box>
  );
}


export default BlogDetail
