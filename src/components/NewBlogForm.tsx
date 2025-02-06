import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Card, Stack, TextField, Button, Input, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUpload } from '@mui/icons-material';

function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    publishedBy: '',
    image: null as File | null, 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/blogs/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('Error fetching blog:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('content', formData.content);
    formDataToSubmit.append('publishedBy', formData.publishedBy);
    if (formData.image) {
      formDataToSubmit.append('image', formData.image);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/blogs/${id}`, formDataToSubmit);
      } else {
        await axios.post('http://localhost:5000/api/blogs', formDataToSubmit);
      }
      navigate('/blog');
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
          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            multiline
            rows={5}
            required
          />
          <TextField
            label="Author"
            name="publishedBy"
            value={formData.publishedBy}
            onChange={handleChange}
            required
          />
            <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          
          {formData.image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {formData.image.name}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth loading={loading}>
            {id ? 'Update Blog' : 'Create Blog'}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default BlogForm;
