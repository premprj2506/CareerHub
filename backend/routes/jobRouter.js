const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const JobListing = require("../models/JobListing"); // Adjust path as necessary
// const { ensureAuthenticated } = require("../middleware/auth"); // Ensure this middleware checks if the user is authenticated

// GET /api/jobs - Fetch all job listings
router.get("/all", jobController.showAllJobs);
router.get("/:jobId", jobController.showOne);

// Route to create a new job listing
router.post("/job-listings", async (req, res) => {
  try {
    const jobListing = new JobListing({
      ...req.body,
      postedBy: req.user._id, // Assuming you store user in req.user after authentication
    });
    console.log(JobListing);
    await jobListing.save();
    res.status(201).json(jobListing);
  } catch (error) {
    res.status(500).json({ error: "Failed to create job listing" });
  }
});

module.exports = router;
