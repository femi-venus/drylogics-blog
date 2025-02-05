import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/SideBar';
import BlogContent from './components/BlogContent';


const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <BlogContent />
    </Box>
  );
};

export default App;
