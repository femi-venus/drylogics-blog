import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import BlogContent from './components/BlogContent';
import BlogForm from './components/NewBlogForm';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* <CssBaseline /> */}
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#f5f5f5',
            padding: 3,
          }}
        >
          <Routes>
            <Route path="/" element={<BlogContent />} />
            <Route path="/blog" element={<BlogContent />} />
            <Route path="/create" element={<BlogForm />} />
            <Route path="/blog/edit/:id" element={<BlogForm />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
