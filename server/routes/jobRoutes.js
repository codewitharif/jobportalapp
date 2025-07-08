const express = require("express");
const { getJobs, getJobById } = require("../controllers/jobController");
const router = express.Router();

//route to get all get all jobs
router.get("/", getJobs);
//route to get single job by id
router.get("/:id", getJobById);

module.exports = router;
