import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import JobListing from "./JobListing";
import JobDetails from "./JobDetails";

// Styled components with direct color values
const SectionHeader = styled(Typography)({
  marginBottom: 16,
  color: "#1976d2", // Primary color
  fontWeight: 700,
  textAlign: "center", // Centered text for header
});

const ErrorText = styled(Typography)({
  color: "#d32f2f", // Error color
  textAlign: "center", // Centered text for error
});

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
    setSelectedJob(job); // Set the selected job to display details
  };

  const handleBackToListings = () => {
    setSelectedJob(null); // Clear selected job to return to listings
  };

  return (
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
        <Box sx={{ textAlign: "center" }}>
          <JobDetails job={selectedJob} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToListings}
            sx={{ mt: 4 }}
          >
            Back to Listings
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default JobBoard;
