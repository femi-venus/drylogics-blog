import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Popover,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Icon } from "@iconify/react";

interface BlogCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

function BlogCard({
  id,
  image,
  title,
  description,
  createdBy,
  createdAt,
  updatedAt,
}: BlogCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleUpdate = () => {
  //   navigate(`/create/${id}`);
  //   handleMenuClose();
  // };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      alert("Blog deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
    handleMenuClose();
  };

  const open = Boolean(anchorEl);

  console.log({ image });
  return (
    <Card
      sx={{ borderRadius: 2, boxShadow: 3, bgcolor: "#ffffff", height: "100%" }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image="https://api-dev-minimal-v630.pages.dev/assets/images/cover/cover-1.webp"
          alt={title}
        />
        <IconButton
          aria-label="Example"
          onClick={handleMenuOpen}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#5e35b1",
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            color: "#000000",
            fontSize: "bold",
            fontStyle: "oblique",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#000000", marginTop: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: "#000000", marginTop: 1 }}>
          <strong>Created by:</strong> {createdBy}
        </Typography>
        <Typography variant="body2" sx={{ color: "#000000", marginTop: 1 }}>
          <strong>Created at</strong> {createdAt} & {""}
          <strong>Updated at:</strong> {updatedAt}
        </Typography>
      </CardContent>
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
        <MenuItem>
          <Icon icon="solar:eye-bold" style={{ marginRight: 8 }} />
          View
        </MenuItem>
        <MenuItem>
          <Icon icon="solar:pen-bold" style={{ marginRight: 8 }} />
          Update
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Icon icon="solar:trash-bin-trash-bold" style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Popover>
    </Card>
  );
}

export default BlogCard;
