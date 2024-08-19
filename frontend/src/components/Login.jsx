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
        username: formData.username, // Updated to use username
        password: formData.password,
      });

      if (response.status === 200) {
        const data = response.data; // Directly access the parsed data
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info in localStorage
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login to CareerHub
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username" // Updated to use username
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
          <div>
            <Link to="" className="f-link">
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
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
          <div className="redirect-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
