const express = require("express");
const router = express.Router();
const jobPosterProfileController = require("../controllers/jobPosterProfileController");

router.get("/", jobPosterProfileController.getAllJobPosterProfiles);
router.get("/:id", jobPosterProfileController.getJobPosterProfileById);
router.post("/", jobPosterProfileController.createJobPosterProfile);
router.put("/:id", jobPosterProfileController.updateJobPosterProfile);
router.delete("/:id", jobPosterProfileController.deleteJobPosterProfile);

module.exports = router;
