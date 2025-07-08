const Job = require("../models/job");
//get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get a single job by id
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job) {
      res.json({ success: false, message: "job not found" });
    }

    res.json({ success: true, job });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { getJobById, getJobs };
