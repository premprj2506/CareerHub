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

const MyAccount = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage or API
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/current_user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error - possibly redirect to login page or show an error message
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={3}>
      <Card>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={user.profile.photo.url}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Typography variant="h5">{user.profile.name}</Typography>
              <Typography variant="subtitle1">{user.email}</Typography>
              <Typography variant="body2">{user.profile.bio}</Typography>
              <Typography variant="body2">{user.profile.contact}</Typography>
              {user.profile.resume && (
                <Button
                  variant="contained"
                  color="primary"
                  href={user.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyAccount;
