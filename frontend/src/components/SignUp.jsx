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
  // State to hold form data
  const [formData, setFormData] = useState({
    username: "", // username input field
    password: "", // password input field
    email: "", // email input field
    role: "", // role input field (e.g., employer or job_seeker)
  });

  // State to hold error messages
  const [error, setError] = useState("");
  // State to hold success messages
  const [success, setSuccess] = useState("");

  // Function to handle input changes and update formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate(); // Get the navigate function
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the signup endpoint with formData
      const response = await axios.post("/api/users/signup", formData);
      if (response.status === 201) {
        const data = response.data; // Get the user data from the response
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info in localStorage
        setSuccess("User registered and logged in successfully!");
        setError("");
        navigate("/feed"); // Redirect to feed
      } else {
        setError("Signup failed. Please try again.");
        setSuccess("");
      }
    } catch (err) {
      // Set error message if registration fails
      setError(err.response.data.message || "An error occurred");
      // Clear success message
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
