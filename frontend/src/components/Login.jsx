import { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess("Logged in successfully!");
        setError("");
        navigate("/feed");
      } else {
        setError("Login failed. Please check your credentials.");
        setSuccess("");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
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
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffffff", // White background for the form
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Login to CareerHub
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Box textAlign="right" width="100%" mt={1}>
              <Link to="" className="f-link">
                Forgot Password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
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
            <Box mt={2}>
              <Typography variant="body2" align="center">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
