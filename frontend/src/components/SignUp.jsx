import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", formData);
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess("User registered and logged in successfully!");
        setError("");
        navigate("/feed");
      } else {
        setError("Signup failed. Please try again.");
        setSuccess("");
      }
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1976d2", // Professional blue background
        minHeight: "100vh", // Full height background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Box
          p={4}
          sx={{
            backgroundColor: "#ffffff", // White background for the form
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            style={{
              textAlign: "center",
            }}
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
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Already on CareerHub? <Link to="/login">Sign in</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpForm;
