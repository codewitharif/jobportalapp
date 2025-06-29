const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [{ type: String }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPosterProfile",
    required: true,
  },
  location: { type: String },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  salaryRange: { type: String },
  jobType: [{ type: String, enum: ["full-time", "part-time", "internship"] }],
  benefits: [{ type: String }],
  workLocationType: [{ type: String, enum: ["remote", "onsite", "hybrid"] }],
  certifications: [{ type: String }],
  expirationDate: { type: Date },
  renewalDate: { type: Date },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "JobCategory" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
