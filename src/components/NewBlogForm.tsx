import React, { useEffect, useState } from "react";
import { Box, Card, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "./editor/editor";  // Your custom editor component
import type { BlogDetailData } from "./BlogDetails";

function BlogForm() {
  const navigate = useNavigate();
  const { filename } = useParams<{ filename: string }>();
  const [formData, setFormData] = useState({
    title: "",
    publishedBy: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState(""); // Local state for editor

  useEffect(() => {
    if (filename) {
      axios
        .get<BlogDetailData>(`http://localhost:5000/api/blogs/${filename}`)
        .then((response) => {
          const blog = response.data;
          setFormData({
            title: blog.title || "",
            content: blog.content || "",
            tags: blog.tags ? blog.tags.join(", ") : "",
            publishedBy: blog.publishedBy || "",
          });
          setEditorContent(blog.content || ""); // Sync editor with fetched blog content
        })
        .catch((error) => console.error("Error fetching blog:", error));
    }
  }, [filename]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (newContent: string) => {
    setEditorContent(newContent);  // Update editor content
    setFormData((prev) => ({ ...prev, content: newContent }));  // Update form data
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    console.log("Submitting Blog with filename:", filename); // Debugging log
  
    try {
      if (filename) {
        console.log("Attempting to update blog with filename:", filename);
        const response = await axios.put(
          `http://localhost:5000/api/blogs/${filename}`,
          { ...formData, content: editorContent },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Update Response:", response.data); // Debugging log
      } else {
        console.log("Creating new blog...");
        const response = await axios.post(
          "http://localhost:5000/api/blogs",
          { ...formData, content: editorContent },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Create Response:", response.data); // Debugging log
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
          {/* Pass editorContent to Editor component */}
          <Editor
            value={editorContent}           // Passing current content to Editor
            onChange={handleContentChange}  // Handle content changes
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
