import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import BlogContent from './components/BlogContent';
import BlogForm from './components/NewBlogForm';
import BlogDetail from './components/BlogDetails';
import Categories from './components/Categories';
import CategoryForm from './components/NewCategoryForm';

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
            <Route path="/categories" element={<Categories />} />
            <Route path="/blog/create" element={<BlogForm />} />
            <Route path="/categories/create" element={<CategoryForm />} />
            <Route path="/edit/:filename" element={<BlogForm />} />
            <Route path="/edit/:category" element={<CategoryForm />} />
            <Route path="/blog/:filename" element={<BlogDetail />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
