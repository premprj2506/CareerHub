import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const JobListing = ({ job, onViewDetails }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography variant="subtitle1">{job.company}</Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {job.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Employment Type: {job.employmentType}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 1 }}
          onClick={() => onViewDetails(job)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobListing;
