require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/conn");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const jobSeekerProfileRoutes = require("./routes/jobSeekerProfileRoutes");
const jobPosterProfileRoutes = require("./routes/jobPosterProfileRoutes");
const jobCategoryRoutes = require("./routes/jobCategoryRoutes");

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/job-seeker-profiles", jobSeekerProfileRoutes);
app.use("/api/job-poster-profiles", jobPosterProfileRoutes);
app.use("/api/job-categories", jobCategoryRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Job Finder Portal API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
