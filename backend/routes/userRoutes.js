const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const User = require("../models/User");

router.post("/signup", userController.signup);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  userController.login
);
router.post("/logout", userController.logout);

// Middleware to ensure the user is authenticated
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Route to get current user's data
router.get("/current_user", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Assumes req.user is set by passport
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
