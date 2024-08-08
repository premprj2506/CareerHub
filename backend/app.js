const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config(); // Ensure environment variables are loaded

const app = express();
const port = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URL = "mongodb://127.0.0.1:27017/careerhub";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Express session
app.use(
  session({
    secret: "fhdfebhjvcisvcihber", // Use environment variable for secret
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
