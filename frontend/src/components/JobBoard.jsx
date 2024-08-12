import { useState } from "react";
import { Grid, Container } from "@mui/material";
import JobListing from "./JobListing";
import JobDetails from "./JobDetails";

const JobBoard = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleBackToListings = () => {
    setSelectedJob(null);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      {!selectedJob ? (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job.id}>
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
