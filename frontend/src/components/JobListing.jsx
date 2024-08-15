import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobListing = ({ job }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/jobs/${job._id}`); // Navigate to the specific job details page
  };

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
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobListing;
