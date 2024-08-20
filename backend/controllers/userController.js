const User = require("../models/User");

exports.signup = async (req, res, next) => {
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
        photo: {
          url: "https://example.com/photos/carol.jpg",
          filename: "carol.jpg",
        },
        bio: "HR Manager at InnovateX Inc.",
        contact: "234-567-8901",
        resume: "https://example.com/resumes/david_lee_resume.pdf",
      },
    });

    let registeredUser = await User.register(newUser, password);

    // Log in the user after registration
    req.login(registeredUser, (error) => {
      if (error) {
        return next(error);
      }
      res.status(201).json({ user: registeredUser });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.user; // This is set by Passport after successful authentication
    res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
};
