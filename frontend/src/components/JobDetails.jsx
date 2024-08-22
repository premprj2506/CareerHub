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
      sx={{
        padding: 2,
        marginTop: "8rem",
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <Card
          sx={{
            boxShadow: 5,
            padding: 3,
            borderRadius: 2,
            backgroundColor: "#f5f5f5", // Light background for contrast
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{ color: "#1976d2", fontWeight: 600 }}
            >
              {job.title}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ color: "#424242" }}
            >
              {job.company}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ marginBottom: 1 }}
            >
              <strong>Location:</strong> {job.location}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ marginBottom: 1 }}
            >
              <strong>Employment Type:</strong> {job.employmentType}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ marginBottom: 2 }}
            >
              <strong>Salary:</strong> ${job.salary || "Not specified"}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <strong>Description:</strong> {job.description}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <strong>Qualifications:</strong>{" "}
              {job.qualifications || "Not specified"}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <strong>Responsibilities:</strong>{" "}
              {job.responsibilities || "Not specified"}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                marginTop: 3,
                display: "block",
                width: "100%",
                backgroundColor: "#1976d2", // Primary color for button
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#1565c0", // Darker shade on hover
                },
              }}
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
