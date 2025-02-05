import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from '@mui/material';

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, description, createdBy, createdAt, updatedAt }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, bgcolor: '#ffffff', height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 500, color: '#5e35b1' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', marginTop: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: '#888', marginTop: 1 }}>
          <strong>Created by:</strong> {createdBy}
        </Typography>
        <Typography variant="body2" sx={{ color: '#888', marginTop: 1 }}>
          <strong>Created at:</strong> {createdAt} | <strong>Updated at:</strong> {updatedAt}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: '#5e35b1', '&:hover': { backgroundColor: '#f5f5f5' } }}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
