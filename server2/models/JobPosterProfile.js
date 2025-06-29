const mongoose = require("mongoose");

const jobPosterProfileSchema = new mongoose.Schema({
  jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  companyName: { type: String },
  companyWebsite: { type: String },
  location: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("JobPosterProfile", jobPosterProfileSchema);
