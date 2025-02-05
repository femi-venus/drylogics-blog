import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
          backgroundColor: '#e8f5e9',
        },
      }}
    >
      <Toolbar />
      <List>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
      </List>
    </Drawer>
  );
};

export default Sidebar;
