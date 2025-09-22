// routes/projects.js
const express = require("express");
const router = express.Router();
const projectList = require("../utils/projectList");
const Submission = require("../models/Submission");

// ✅ Get all projects with availability status
router.get("/", async (req, res) => {
  try {
    // Get all submissions to check project availability
    const submissions = await Submission.find({}, 'projectId status');
    
    // Create a map of taken projects
    const takenProjects = new Map();
    submissions.forEach(submission => {
      takenProjects.set(submission.projectId, {
        status: submission.status,
        isTaken: true
      });
    });
    
    // Add availability status to each project
    const projectsWithStatus = projectList.map(project => ({
      ...project,
      isAvailable: !takenProjects.has(project.id),
      submissionStatus: takenProjects.get(project.id)?.status || null
    }));
    
    res.json(projectsWithStatus);
  } catch (error) {
    console.error("Error fetching projects with status:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/projects/:id (project details)
router.get("/:id", (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projectList.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});

module.exports = router;
