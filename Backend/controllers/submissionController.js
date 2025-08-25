// controllers/submissionController.js
const Submission = require("../models/Submission");
const projectList = require("../utils/projectList");
 
// @desc   Create a new submission
// @route  POST /api/submissions
// @access Student (Authenticated User)
const createSubmission = async (req, res) => {
  try {
    const { members, teamLeadPhone } = req.body;

    const projectId = parseInt(req.params.id, 10); // convert string to number
   
    if (!members || members.length === 0 || !teamLeadPhone ) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // 1. Check project is valid
    const project = projectList.find(p => p.id === projectId);
    if (!project) {
      return res.status(400).json({ message: "Invalid project selected" });
    }

  // 2. Check if same user already submitted this project
    const sameProjectByUser = await Submission.findOne({ projectId, submittedBy: req.user.id });
    if (sameProjectByUser) {
      return res.status(400).json({ message: "You already submitted this project" });
    }

    // 3. Check if some other user already took this project
    const projectTaken = await Submission.findOne({ projectId });
    if (projectTaken) {
      return res.status(400).json({ message: "This project is already taken" });
    }

    // 4. Check if this user already submitted some other project
    const already = await Submission.findOne({ submittedBy: req.user.id });
    if (already) {
      return res.status(400).json({ message: "You already submitted a project" });
    }

    let submission = new Submission({
      projectTitle: project.title,
      projectId,
      projectDescription: project.description,
      members,
      teamLeadPhone,
      submittedBy: req.user.id, // from auth middleware
      isLocked: true,
    });

    await submission.save();

    submission = await submission.populate("submittedBy", "name email");
    res.status(201).json({ message: "Submission created successfully", submission });
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Get my submissions
// @route  GET /api/submissions/my
// @access Student (Authenticated User)
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ submittedBy: req.user.id });
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Get all submissions (Admin only)
// @route  GET /api/submissions
// @access Admin
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
     .populate("submittedBy", "firstName lastName emailId");
    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching all submissions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// @desc   Update submission status (Approve / Reject)
// @route  PUT /api/submissions/:id/status
// @access Admin
const updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const submission = await Submission.findById(id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.status = status;
    await submission.save();

    res.json({ message: "Submission status updated", submission });
  } catch (error) {
    console.error("Error updating submission status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createSubmission,
  getMySubmissions,
  getAllSubmissions,
  updateSubmissionStatus,
};
