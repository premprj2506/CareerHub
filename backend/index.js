const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User"); // Adjust the path according to your file structure

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const MONNGO_URL = "mongodb://127.0.0.1:27017/careerhub";
// const dbURL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONNGO_URL);
}

// Routes

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/api/signup", async (req, res) => {
  const { username, password, email, role } = req.body;

  // Basic validation
  if (!username || !password || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = new User({
      username,
      password,
      email,
      role,
      profile: {
        name: "", // Default values, adjust as needed
        bio: "",
        contact: "",
        resume: "",
      },
    });

    // const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
