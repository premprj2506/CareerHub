const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
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
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpires: {
    type: Date,
    default: null,
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

// Configure passport-local-mongoose to use email instead of username
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
