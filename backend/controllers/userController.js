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
          url: "../public/img/images.png",
          filename: "images.png",
        },
        bio: role === "employer" ? "HR Manager at InnovateX Inc." : "Student",
        contact: "234-567-8901",
        resume:
          "https://drive.google.com/file/d/1NF1MIN-G3Qd9y6BcbvwzuZSpI7im92xe/view?usp=sharing",
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
