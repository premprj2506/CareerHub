const User = require("../models/User");
const passport = require("passport");

exports.signup = async (req, res) => {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = new User({
      username,
      email,
      role,
      profile: {
        name: username,
        bio: "",
        contact: "",
        resume: "",
      },
    });

    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (error) => {
      if (error) {
        return next(error);
      }
      res.status(201).json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      console.warn("Authentication failed:", info.message);
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      console.log("User logged in successfully:", user);
      return res.status(200).json(user);
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
};
