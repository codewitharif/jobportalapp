const Company = require("../models/company");
const Job = require("../models/job");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const job = require("../models/job");
const jobApplication = require("../models/jobApplication");
const { messageInRaw } = require("svix");
const cloudinary = require("cloudinary").v2; // if not already configured, do it here or in a separate file

const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const file = req.file;

    if (!name || !email || !password || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company
    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
      image: uploadResult.secure_url, // store the image URL from Cloudinary
    });

    // Save to database
    await newCompany.save();

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      token: generateToken(newCompany._id),
    });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//login company
const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if company exists
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Respond with token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(company._id),
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get company data
const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//post a new job
const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();
    res.status(200).json({ success: true, newJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get company job applicants
const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;
    console.log(companyId);

    //find job applications for the user and populate related data
    const applications = await jobApplication
      .find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();
    return res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//gett company posted jobs
const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    //todo adding no. of applicants info in data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await jobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({ success: true, jobData: jobsData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//change job application status
const changeJobApplicationsStatus = async (req,res) => {
  try {
    const { id, status } = req.body;
    //find job application and update status
    await jobApplication.findOneAndUpdate({ _id: id }, { status });
    res.json({ success: true, message: "status changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change job visiblity
// const changeVisiblity = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const companyId = req.company._id;

//     const job = await Job.findById(id);

//     if (companyId.toString() === job.companyId.toString()) {
//       job.visible = !job.visible;
//     }

//     await job.save();
//     res.json({ success: true, job });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

const changeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
      await job.save(); // ✅ Save only when updated
      return res.json({ success: true, job });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to update this job" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export all controllers
module.exports = {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationsStatus,
  changeVisiblity,
};
