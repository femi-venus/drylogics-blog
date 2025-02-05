import React from 'react';
import { Box, Typography, Button, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const BlogContent: React.FC = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Blog
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ position: 'absolute', top: 20, right: 20 }}
      >
        New Post
      </Button>
    </Box>
  );
};

export default BlogContent;
