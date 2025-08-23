const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },

  projectId: {
    type: Number,
    required: true
  },

  projectDescription: {
    type: String,
  },

  isLocked: { type: Boolean, default: false },

  members: [
    {
      name: { type: String, required: true },
      rollNumber: { type: String, required: true },
      enrollNumber: { type: String, required: true },
    },
  ],
  
  teamLeadPhone: {
    type: String,
    required: true,
  },

  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // who submitted
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
