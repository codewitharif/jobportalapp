const mongoose = require("mongoose");

const jobCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: null },
});

module.exports = mongoose.model("JobCategory", jobCategorySchema);
