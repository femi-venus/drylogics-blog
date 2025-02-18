import React, { useEffect, useState } from "react";
import { Box, Card, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CategoryForm() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>(); 
  const [formData, setFormData] = useState({
    category: "",
    defaultTags: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:5000/api/categories/${category}`)
        .then((response) => {
          setFormData({
            category: response.data.category,
            defaultTags: response.data.defaultTags ? response.data.defaultTags.join(", ") : "",
          });
        })
        .catch((error) => console.error("Error fetching category:", error));
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const payload = {
        category: formData.category.trim(),
        defaultTags: formData.defaultTags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
      };
  
      await axios.post("http://localhost:5000/api/categories", payload, {
        headers: { "Content-Type": "application/json" }, // Ensure JSON format
      });
  
      navigate("/categories");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Category Name"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <TextField
            label="Default Tags (comma-separated)"
            name="defaultTags"
            value={formData.defaultTags}
            onChange={handleChange}
          />
          <LoadingButton type="submit" variant="contained" fullWidth loading={loading}>
            {category ? "Update Category" : "Create Category"}
          </LoadingButton>
        </Stack>
      </Card>
    </Box>
  );
}

export default CategoryForm;
