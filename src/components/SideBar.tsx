import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import EditNoteIcon from '@mui/icons-material/EditNote';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#808b96', 
          color: '#808b96',
          paddingTop: '20px',
        },
      }}
    >
      <Toolbar />
      <Typography variant="h5" sx={{ textAlign: 'center', color: '#ffffff', fontWeight: 600, marginBottom: '20px' }}>
        Dashboard
      </Typography>
      
      <List>
        <ListItem component={Link} to="/blog" sx={{
          '&:hover': {
            backgroundColor: '#999999', 
            borderRadius: '5px',
          },
          padding: '10px 15px',
        }} >
          <ListItemIcon sx={{ color: 'white' }}>
            <EditNoteIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary="Blogs" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem component={Link} to="/categories" sx={{
          '&:hover': {
            backgroundColor: '#999999', 
            borderRadius: '5px',
          },
          padding: '10px 15px',
        }} >
          <ListItemIcon sx={{ color: 'white' }}>
            <CategoryIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary="Categories" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
