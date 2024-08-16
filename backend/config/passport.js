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
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        // If the user is found, check the password
        const isMatch = await user.authenticate(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
); // Using the authenticate method from the User model to handle authentication

// Serializing the user to store in the session
passport.serializeUser(User.serializeUser()); // serializeUser determines which data of the user object should be stored in the session

// Deserializing the user from the session
passport.deserializeUser(User.deserializeUser()); // deserializeUser is used to fetch the user details from the session

module.exports = passport;
