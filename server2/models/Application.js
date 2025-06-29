const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeekerProfile",
    required: true,
  },
  resumeURL: { type: String },
  coverLetter: { type: String },
  status: { type: String, enum: ["applied", "shortlisted", "interviewed", "hired", "rejected"] },
  appliedAt: { type: Date, default: Date.now },
  interviewSchedule: { type: Date },
  feedback: { type: String },
  notificationSent: { type: Boolean, default: false },
});

module.exports = mongoose.model("Application", applicationSchema);
