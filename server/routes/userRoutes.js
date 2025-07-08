const express = require("express");
const {
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserResume,
} = require("../controllers/userController");
const upload = require("../config/multer");

const router = express.Router();

router.get("/user", getUserData);
router.post("/apply", applyForJob);
router.get("/applications", getUserJobApplications);
router.post("/update-resume", upload.single('resume') ,updateUserResume);

module.exports = router;

