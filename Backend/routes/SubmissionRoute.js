const express = require("express");
const { 
  createSubmission, 
  getMySubmissions, 
  getAllSubmissions, 
  updateSubmissionStatus 
} = require("../controllers/SubmissionController");

const { userAuth } = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// Student Routes
router.post("/", userAuth, createSubmission);       // Submit project
router.get("/my", userAuth, getMySubmissions);      // Get my submissions

// Admin Routes
router.get("/", userAuth, admin, getAllSubmissions);       // Get all submissions
router.put("/:id/status", userAuth, admin, updateSubmissionStatus); // Approve/Reject

module.exports = router;
