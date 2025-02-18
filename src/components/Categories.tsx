import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Toolbar,
  Grid,
  Card,
  Stack,
  IconButton,
  Popover,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Icon } from "@iconify/react";

export type CategoryData = {
  category: string;
  defaultTags: string[];
};

function Categories() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<CategoryData[]>("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, category: string) => {
    setAnchorEl((prev) => ({ ...prev, [category]: event.currentTarget }));
  };

  const handleMenuClose = (category: string) => {
    setAnchorEl((prev) => ({ ...prev, [category]: null }));
  };

  const handleUpdate = (category: string) => {
    navigate(`/categories/edit/${category}`);
  };

  const handleDelete = async (category: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${category}`);
      setCategories((prev) => prev.filter((cat) => cat.category !== category));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    handleMenuClose(category);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#333" }}>
        Categories
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate("/categories/create")}
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          backgroundColor: "#808b96",
          "&:hover": { backgroundColor: "#999999" },
        }}
      >
        Create Category
      </Button>

      <Grid container spacing={3} sx={{ marginTop: "60px" }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.category}>
            <Card
              sx={{
                p: 3,
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" gutterBottom>
                  {category.category}
                </Typography>
                <IconButton onClick={(e) => handleMenuOpen(e, category.category)}>
                  <MoreVertIcon />
                </IconButton>
              </Stack>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Tags: {category.defaultTags.join(", ")}
              </Typography>
            </Card>

            <Popover
              open={Boolean(anchorEl[category.category])}
              anchorEl={anchorEl[category.category]}
              onClose={() => handleMenuClose(category.category)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleUpdate(category.category)}>
                <Icon icon="solar:pen-bold" style={{ marginRight: 8 }} />
                Update
              </MenuItem>
              <MenuItem onClick={() => handleDelete(category.category)}>
                <Icon icon="solar:trash-bin-trash-bold" style={{ marginRight: 8 }} />
                Delete
              </MenuItem>
            </Popover>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Categories;
