import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ padding: 2, marginTop: "5rem" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              {job.company}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Location: {job.location}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Employment Type: {job.employmentType}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Salary: ${job.salary || "Not specified"}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              <strong>Description:</strong> {job.description}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              <strong>Qualifications:</strong>{" "}
              {job.qualifications || "Not specified"}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              <strong>Responsibilities:</strong>{" "}
              {job.responsibilities || "Not specified"}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2, display: "block", width: "100%" }}
              onClick={() => window.history.back()}
            >
              Back to Listings
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default JobDetails;
