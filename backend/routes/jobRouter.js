const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// GET /api/jobs - Fetch all job listings
router.get("/show", jobController.show);

module.exports = router;
