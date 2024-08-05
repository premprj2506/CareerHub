import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", formData);
      setSuccess("User registered successfully!");
      setError("");
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          Optimize Your Career Journey With CareerHub
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
            autoFocus
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
        {error && (
          <Typography color="error" align="center" mt={2}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" align="center" mt={2}>
            {success}
          </Typography>
        )}
        <div className="redirect-link">
          Already on CareerHub? <Link to="/login">Sign in</Link>
        </div>
      </Box>
    </Container>
  );
};

export default SignUpForm;
