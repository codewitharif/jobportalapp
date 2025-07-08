const { messageInRaw } = require("svix");
const job = require("../models/job");
const jobApplication = require("../models/jobApplication");
const User = require("../models/user");
const user = require("../models/user");
const cloudinary = require("cloudinary").v2;

//get user data
const getUserData = async (req, res) => {
  //   const userId = req.auth.userId;
  const { userId } = req.auth();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "user not authorized" });
  }
};

//apply for a job
const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth().userId;
  console.log("User ID:", userId);
  try {
    const isAlreadyApplied = await jobApplication.find({ jobId, userId });
    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "already applied" });
    }
    const jobData = await job.findById(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "job not found" });
    }
    await jobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });
    res.json({ success: true, message: "job applied succesfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get user applied applications
const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const applications = await jobApplication
      .find({ userId })
      .populate("companyId", "name email image")

      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "no job application found to display",
      });
    }
    res.json({ success: true, applications });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update user profile (resume only)
const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const resumeFile = req.file;
    const userData = await user.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    res.json({ success: true, message: "resume updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserResume,
};
