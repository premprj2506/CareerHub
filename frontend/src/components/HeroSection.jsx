import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { styled } from "@mui/system";

const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage:
    'url("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textAlign: "center",
  padding: theme.spacing(8, 2),
  marginTop: theme.spacing(8),
  position: "relative",
  width: "100%", // Ensure full width
  backgroundRepeat: "no-repeat", // Prevent image from repeating
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
