const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  // Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
  // username: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
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

// Plugin to use passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
