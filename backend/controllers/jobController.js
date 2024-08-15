const JobListing = require("../models/JobListing"); // Adjust path if needed

exports.show = async (req, res) => {
  try {
    const jobs = await JobListing.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
