import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  IconButton,
  Typography,
  Popover,
  Box,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Icon } from "@iconify/react";
import axios from "axios";

type BlogIndexEntry = {
  title: string;
  publishedDate: string;
  tags: string[];
  filename: string;
};

function BlogCard({ title, publishedDate, tags, filename}: BlogIndexEntry) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = (filename: string) => {
    navigate(`/edit/${filename.replace(/\.yml$/, '')}`);
  };
  
  

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${filename}`);
      alert("Blog deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
    handleMenuClose();
  };

  const open = Boolean(anchorEl);

  const handleViewBlog = (filename: string) => {
    navigate(`/blog/${filename.replace(/\.yml$/, '')}`);
  };
  
  
  return (
    <>
      <Grid item xs={12} sm={6} md={4} >
        <Card
         
          sx={{
            p: 3,
            cursor: "pointer",
            "&:hover": { boxShadow: 6 },
          }}
          key={filename}
        >
          <Stack direction='row' justifyContent='space-between'>
          <Typography variant="h6" gutterBottom  onClick={() => handleViewBlog(filename)}>
            {title}
          </Typography>
          <IconButton
            aria-label="Example"
            onClick={handleMenuOpen}
          > <MoreVertIcon /></IconButton>
        
          </Stack>
          <Typography variant="body2" color="textSecondary">
            Published: {new Date(publishedDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Tags: {tags.join(", ")}
          </Typography>
        </Card>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => handleUpdate(filename)}>
            <Icon icon="solar:pen-bold" style={{ marginRight: 8 }} />
            Update
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <Icon
              icon="solar:trash-bin-trash-bold"
              style={{ marginRight: 8 }}
            />
            Delete
          </MenuItem>
        </Popover>
      </Grid>
    </>
  );
}

export default BlogCard;
