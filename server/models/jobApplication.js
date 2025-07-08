const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String, // ✅ Clerk user ID is a string
    ref: "User",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  status: {
    type: String,
    default: "Pending", // 🛠️ spelling corrected
    enum: ["Pending", "Accepted", "Rejected"], // optional but good for validation
  },
  date: { type: Number, required: true },
});

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
