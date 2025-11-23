const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getAttendanceHistory,
  getAllAttendance,
  getDashboardSummary,
} = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.get("/dashboard/summary", getDashboardSummary);
router.get("/", getAllAttendance);
router.get("/:employeeId", getAttendanceHistory);

module.exports = router;

