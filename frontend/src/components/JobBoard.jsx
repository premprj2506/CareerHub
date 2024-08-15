import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import JobListing from "./JobListing";
import JobDetails from "./JobDetails";

// Define theme inside the component
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Example primary color
    },
    secondary: {
      main: "#dc004e", // Example secondary color
    },
    error: {
      main: "#d32f2f", // Example error color
    },
  },
});

// Styled components
const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs/all");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (job) => {
    navigate(`/jobs/show/${job._id}`); // Redirect to job details page
  };

  const handleBackToListings = () => {
    navigate("/"); // Redirect back to job listings
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: 4 }}>
        {loading ? (
          <SectionHeader variant="h4">Loading...</SectionHeader>
        ) : error ? (
          <ErrorText variant="h5">Error: {error}</ErrorText>
        ) : !selectedJob ? (
          <>
            <SectionHeader variant="h4">Job Listings</SectionHeader>
            <Grid container spacing={3}>
              {jobs.map((job) => (
                <Grid item xs={12} md={6} key={job._id}>
                  <JobListing job={job} onViewDetails={handleViewDetails} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <JobDetails job={selectedJob} onBack={handleBackToListings} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default JobBoard;
