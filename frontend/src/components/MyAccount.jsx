import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/current_user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          boxShadow: 5,
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1976d2",
            color: "#ffffff",
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">My Profile</Typography>
        </Box>
        <CardContent sx={{ padding: 3 }}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Avatar
                src={user.profile.photo.url}
                sx={{
                  width: 120,
                  height: 120,
                  marginBottom: 2,
                  border: "4px solid #1976d2",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                {user.profile.name}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
              >
                {user.email}
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                {user.profile.bio}
              </Typography>
              <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                gutterBottom
              >
                Contact: {user.profile.contact}
              </Typography>
              {user.profile.resume && (
                <Button
                  variant="contained"
                  color="primary"
                  href={user.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    margin: "0 auto",
                    marginTop: 2,
                    backgroundColor: "#1976d2",
                    textAlign: "center",
                  }}
                >
                  View Resume
                </Button>
              )}
              {user.role === "employer" ? (
                <Button
                  variant="contained"
                  color="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    margin: "0 auto",
                    width: "100%",
                    marginTop: 2,
                    backgroundColor: "#1976d2",
                    textAlign: "center",
                  }}
                  onClick={() => navigate("/addJob")}
                >
                  Add New JobListing
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyAccount;
