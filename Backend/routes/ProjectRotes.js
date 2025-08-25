// routes/projects.js
const express = require("express");
const router = express.Router();
const projectList = require("../utils/projectList");

// ✅ Get all projects
router.get("/", (req, res) => {
  res.json(projectList);
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
