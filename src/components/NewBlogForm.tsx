import React, { useEffect, useState } from "react";
import { Box, Card, Stack, TextField, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "./editor/editor"; 
import type { BlogDetailData } from "./BlogDetails";

function BlogForm() {
  const navigate = useNavigate();
  const { filename } = useParams<{ filename: string }>();
  const [formData, setFormData] = useState({
    title: "",
    publishedBy: "",
    content: "",
    tags: "",
    category: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState(""); 
  const [categories, setCategories] = useState<{ category: string; defaultTags: string[] }[]>([]);

  useEffect(() => {
    // Fetch available categories
    axios.get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (filename) {
      axios.get<BlogDetailData>(`http://localhost:5000/api/blogs/${filename}`)
        .then((response) => {
          const blog = response.data;
          setFormData({
            title: blog.title || "",
            content: blog.content || "",
            tags: blog.tags ? blog.tags.join(", ") : "",
            publishedBy: blog.publishedBy || "",
            category: blog.category || "",
            imageUrl: blog.image || "",
          });
          setEditorContent(blog.content || ""); 
        })
        .catch((error) => console.error("Error fetching blog:", error));
    }
  }, [filename]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = e.target.value;
    
    setFormData(prev => {
      // Fetch category-specific default tags (assuming you have access to them)
      const categoryObj = categories.find(cat => cat.category === selectedCategory);
      const newTagsArray = Array.from(new Set([
        ...prev.tags.split(',').map(tag => tag.trim()),  // Convert existing tags to an array
        ...(categoryObj?.defaultTags || []) // Add category default tags if available
      ]));
  
      return {
        ...prev,
        category: selectedCategory,
        tags: newTagsArray.join(', '), // Convert array back to a comma-separated string
      };
    });
  };
  

  const handleContentChange = (newContent: string) => {
    setEditorContent(newContent); 
    setFormData((prev) => ({ ...prev, content: newContent })); 
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("publishedBy", formData.publishedBy);
      formDataToSend.append("content", editorContent);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("category", formData.category);  // ✅ Fix: Ensure category is sent
  
      if (formData.imageUrl) {
        formDataToSend.append("imageUrl", formData.imageUrl);
      }
  
      if (filename) {
        await axios.put(
          `http://localhost:5000/api/blogs/${filename}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/api/blogs", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/blog");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false);
  };
  
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 3, maxWidth: 600, mx: "auto" }}
    >
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Editor
            value={editorContent} 
            onChange={handleContentChange} 
            showToolbar
          />
          <TextField
            label="Author"
            name="publishedBy"
            value={formData.publishedBy}
            onChange={handleChange}
            required
          />
          <TextField
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.category}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={loading}
          >
            {filename ? "Update Blog" : "Create Blog"}
          </LoadingButton>
        </Stack>
      </Card>
    </Box>
  );
}

export default BlogForm;
