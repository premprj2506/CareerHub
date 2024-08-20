const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport"); // Passport is an authentication middleware for Node.js
const LocalStrategy = require("passport-local").Strategy; // Passport-local is a strategy for authenticating with a username and password
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRouter");
const User = require("./models/User");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use port from environment or default to 3000

// MongoDB connection string
const MONGO_URL = "mongodb://127.0.0.1:27017/careerhub";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Function to establish MongoDB connection
async function main() {
  await mongoose.connect(MONGO_URL);
}

// Middleware for parsing JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session configuration for handling user sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fhdfebhjvcisvcihber", // Store in env variable
    resave: false,
    saveUninitialized: false, // Usually better to avoid storing empty sessions
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

// Initialize Passport for authentication handling
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// Serializing the user to store in the session
passport.serializeUser(User.serializeUser()); // serializeUser determines which data of the user object should be stored in the session
// Deserializing the user from the session
passport.deserializeUser(User.deserializeUser()); // deserializeUser is used to fetch the user details from the session

// Default route to check if the server is running
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// Define routes for user and job-related API requests
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
