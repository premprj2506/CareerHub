const JobListing = require("../models/JobListing"); // Adjust path if needed
const wrapAsync = require("../utils/wrapAsync.js");

exports.showAllJobs = wrapAsync(async (req, res) => {
  const jobs = await JobListing.find();
  res.json(jobs);
});

exports.showOne = wrapAsync(async (req, res) => {
  const jobId = req.params.jobId;
  const job = await JobListing.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.json(job);
});
