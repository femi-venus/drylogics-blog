import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

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
          backgroundColor: '#808b96', // Darker background
          color: '#808b96', // White text
          paddingTop: '20px',
          // boxShadow: '4px 0px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        },
      }}
    >
      <Toolbar />
      {/* Sidebar header */}
      <Typography variant="h6" sx={{ textAlign: 'center', color: '#ffffff', fontWeight: 600, marginBottom: '20px' }}>
        Dashboard
      </Typography>
      
      <List>
        {/* Blog Item */}
        <ListItem component={Link} to="/blog" sx={{
          '&:hover': {
            backgroundColor: '#999999', // Hover effect
            borderRadius: '5px',
          },
          padding: '10px 15px',
        }} >
          <ListItemIcon sx={{ color: 'white' }}>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Blogs" sx={{ color: 'white' }} />
        </ListItem>
        
        {/* Add other menu items */}
        {/* Example:
        <ListItem component={Link} to="/about" button sx={{ '&:hover': { backgroundColor: '#5e35b1' } }}>
          <ListItemText primary="About" />
        </ListItem>
        */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
