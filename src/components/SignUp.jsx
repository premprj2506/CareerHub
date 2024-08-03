import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    name: "",
    bio: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log("Form submitted:", formData);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          Optimize Your Career Journey
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Role"
            name="role"
            select
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="employer">Employer</MenuItem>
            <MenuItem value="job_seeker">Job Seeker</MenuItem>
          </TextField>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ marginBottom: "1.5rem" }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
        <Link to="/login">Already on LinkedIn? Sign in</Link>
      </Box>
    </Container>
  );
};

export default SignUpForm;
