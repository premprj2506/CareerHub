import React, { useState, useEffect } from "react";
import { Grid, Container } from "@mui/material";
import JobListing from "./JobListing";
import JobDetails from "./JobDetails";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs/show");
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
    setSelectedJob(job);
  };

  const handleBackToListings = () => {
    setSelectedJob(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      {!selectedJob ? (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <JobListing job={job} onViewDetails={handleViewDetails} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <JobDetails job={selectedJob} onBack={handleBackToListings} />
      )}
    </Container>
  );
};

export default JobBoard;
