const passport = require("passport"); // Passport is an authentication middleware for Node.js
const LocalStrategy = require("passport-local").Strategy; // Passport-local is a strategy for authenticating with a username and password
const User = require("../models/User");

// Setting up Passport to use the local strategy for authentication
// Configure Passport to use email instead of username
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    User.authenticate()
  )
); // Using the authenticate method from the User model to handle authentication

// Serializing the user to store in the session
passport.serializeUser(User.serializeUser()); // serializeUser determines which data of the user object should be stored in the session

// Deserializing the user from the session
passport.deserializeUser(User.deserializeUser()); // deserializeUser is used to fetch the user details from the session

module.exports = passport;
