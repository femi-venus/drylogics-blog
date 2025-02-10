import React, { useEffect, useState } from 'react';
import { Box, Card, Stack, TextField, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from './editor/editor';
import type { BlogDetailData } from './BlogDetails';

function BlogForm() {
  const navigate = useNavigate();
  const { filename } = useParams<{ filename: string }>();
  const [formData, setFormData] = useState({
    title: '',
    publishedBy: '',
    content: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filename) {
      axios.get<BlogDetailData>(`http://localhost:5000/api/blogs/${filename}`)
        .then(response => {
          const blog = response.data;
          setFormData({
            title: blog.title || '',
            content: blog.content || '',
            tags: blog.tags ? blog.tags.join(', ') : '',
            publishedBy: blog.publishedBy || '' 
          });
        })
        .catch(error => console.error('Error fetching blog:', error));
    }
  }, [filename]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (newContent: string) => {
    setFormData({ ...formData, content: newContent });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('content', formData.content);
    formDataToSubmit.append('tags', formData.tags);
    formDataToSubmit.append('publishedBy', formData.publishedBy);
  
    try {
      if (filename) {
        // Updating an existing blog, make sure the filename is passed in the URL
        await axios.put(`http://localhost:5000/api/blogs/${filename}`, formDataToSubmit, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Creating a new blog, don't pass filename in the URL
        await axios.post('http://localhost:5000/api/blogs', formDataToSubmit, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/blog');  // Redirect after successful creation/update
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setLoading(false);
  };
  
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Editor
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Content..."
            showToolbar
          />
          <TextField
            label="Author"
            name="publishedBy"  // Use 'author' to match the formData key
            value={formData.publishedBy}
            onChange={handleChange}
            required
          />
          <TextField
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
          <LoadingButton type="submit" variant="contained" fullWidth loading={loading}>
            {filename ? 'Update Blog' : 'Create Blog'}
          </LoadingButton>
        </Stack>
      </Card>
    </Box>
  );
}

export default BlogForm;
