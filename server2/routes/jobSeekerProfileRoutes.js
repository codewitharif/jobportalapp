const express = require("express");
const router = express.Router();
const jobSeekerProfileController = require("../controllers/jobSeekerProfileController");

router.get("/", jobSeekerProfileController.getAllJobSeekerProfiles);
router.get("/:id", jobSeekerProfileController.getJobSeekerProfileById);
router.post("/", jobSeekerProfileController.createJobSeekerProfile);
router.put("/:id", jobSeekerProfileController.updateJobSeekerProfile);
router.delete("/:id", jobSeekerProfileController.deleteJobSeekerProfile);

module.exports = router;
