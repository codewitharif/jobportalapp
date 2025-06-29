const JobSeekerProfile = require("../models/JobSeekerProfile");

exports.getAllJobSeekerProfiles = async (req, res) => {
  try {
    const profiles = await JobSeekerProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobSeekerProfileById = async (req, res) => {
  try {
    const profile = await JobSeekerProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createJobSeekerProfile = async (req, res) => {
  try {
    const profile = new JobSeekerProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateJobSeekerProfile = async (req, res) => {
  try {
    const profile = await JobSeekerProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteJobSeekerProfile = async (req, res) => {
  try {
    const profile = await JobSeekerProfile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
