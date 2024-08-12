const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobListingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "contract"],
    required: true,
  },
  salary: { type: Number },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  datePosted: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

const JobListing = mongoose.model("JobListing", jobListingSchema);

module.exports = JobListing;
