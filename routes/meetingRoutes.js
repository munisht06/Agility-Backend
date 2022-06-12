const express = require("express");
const router = express.Router();
const {
  getMeeting,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

const protect = require("../middleware/authMiddleware");


router.route("/").get(protect, getMeeting).post(protect, createMeeting);
router.route("/:id").put(updateMeeting).delete(deleteMeeting);

module.exports = router;
