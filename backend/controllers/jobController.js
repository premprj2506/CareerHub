const JobListing = require("../models/JobListing"); // Adjust path if needed

exports.showAllJobs = async (req, res) => {
  try {
    const jobs = await JobListing.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.showOne = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await JobListing.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
