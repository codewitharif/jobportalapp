const mongoose = require("mongoose");

const jobSeekerProfileSchema = new mongoose.Schema({
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  bio: { type: String },
  resumeURL: { type: String },
  skills: [{ type: String }],
  experience: { type: Number },
  location: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  education: { type: String },
});

module.exports = mongoose.model("JobSeekerProfile", jobSeekerProfileSchema);
