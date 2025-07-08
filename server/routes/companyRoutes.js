// routes/company.js
const express = require("express");
const upload = require("../config/multer");
const {
  changeJobApplicationsStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} = require("../controllers/companyController");
const protectCompany = require("../middleware/authMiddleware");
const router = express.Router();

// register a company
router.post("/register", upload.single("image"), registerCompany);
//login a company
router.post("/login", loginCompany);
//get company data
router.get("/company", protectCompany,getCompanyData);
//post job
router.post("/post-job", protectCompany,postJob);

//get applicants
router.get("/applicants", protectCompany,getCompanyJobApplicants);
//get company job list
router.get("/list-jobs",protectCompany, getCompanyPostedJobs);
//change application status
router.post("/change-status",protectCompany, changeJobApplicationsStatus);

//change applications visiblity
router.post("/change-visiblity",protectCompany, changeVisiblity);

// Export the router
module.exports = router;
