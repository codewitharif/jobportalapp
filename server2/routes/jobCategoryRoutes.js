const express = require("express");
const router = express.Router();
const jobCategoryController = require("../controllers/jobCategoryController");

router.get("/", jobCategoryController.getAllJobCategories);
router.get("/:id", jobCategoryController.getJobCategoryById);
router.post("/", jobCategoryController.createJobCategory);
router.put("/:id", jobCategoryController.updateJobCategory);
router.delete("/:id", jobCategoryController.deleteJobCategory);

module.exports = router;
