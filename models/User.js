const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["employer", "job_seeker"], required: true },
  profile: {
    name: { type: String, required: true },
    photo: {
      url: String,
      filename: String,
    },
    bio: { type: String },
    contact: { type: String },
    resume: { type: String }, // URL to the resume file
    // Add more fields as needed
  },
  resetToken: {
    type: String,
    default: null, // Change default value to null
  },
  resetTokenExpires: {
    type: Date,
    default: null, // Change default value to null
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
