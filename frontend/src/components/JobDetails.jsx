import { Card, CardContent, Typography, Button } from "@mui/material";

const JobDetails = ({ job, onBack }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{job.title}</Typography>
        <Typography variant="h6">{job.company}</Typography>
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
          sx={{ marginTop: 2 }}
          onClick={onBack}
        >
          Back to Listings
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobDetails;
