import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const employmentTypes = ["full-time", "part-time", "contract"];

const CreateJobListing = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    employmentType: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/jobs/job-listings", job);
      if (response.status === 201) {
        navigate("/feed"); // Redirect to job listings page after successful creation
      }
    } catch (error) {
      console.error("Failed to create job listing", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#f7f7f7", // Light background color for contrast
        padding: "1rem 2rem",
        borderRadius: 2,
        boxShadow: 3,
        marginTop: "7rem", // Margin to add space at the top
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 1,
          color: "#1976d2", // Primary color
          fontWeight: 600,
        }}
      >
        Create Job Listing
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Title"
          name="title"
          value={job.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={job.description}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <TextField
          label="Company"
          name="company"
          value={job.company}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <TextField
          label="Location"
          name="location"
          value={job.location}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <TextField
          select
          label="Employment Type"
          name="employmentType"
          value={job.employmentType}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        >
          {employmentTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Salary"
          name="salary"
          type="number"
          value={job.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            mt: 3,
            padding: 1.5,
            fontWeight: 600,
            backgroundColor: "#1976d2", // Primary color for the button
            "&:hover": {
              backgroundColor: "#1565c0", // Darker shade on hover
            },
          }}
        >
          Create Job Listing
        </Button>
      </form>
    </Container>
  );
};

export default CreateJobListing;
