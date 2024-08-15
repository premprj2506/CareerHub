import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { styled } from "@mui/system";

const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("https://source.unsplash.com/1600x900/?office,job")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

const HeroSection = () => {
  return (
    <HeroContainer>
      <Overlay />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Your Future Awaits
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Discover thousands of jobs that fit your life goals.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
          <Button variant="outlined" color="secondary" size="large">
            Learn More
          </Button>
        </Stack>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
