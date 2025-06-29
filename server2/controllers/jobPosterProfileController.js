const JobPosterProfile = require("../models/JobPosterProfile");

exports.getAllJobPosterProfiles = async (req, res) => {
  try {
    const profiles = await JobPosterProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobPosterProfileById = async (req, res) => {
  try {
    const profile = await JobPosterProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createJobPosterProfile = async (req, res) => {
  try {
    const profile = new JobPosterProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateJobPosterProfile = async (req, res) => {
  try {
    const profile = await JobPosterProfile.findByIdAndUpdate(
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

exports.deleteJobPosterProfile = async (req, res) => {
  try {
    const profile = await JobPosterProfile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
