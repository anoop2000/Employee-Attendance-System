const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Public
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !status) {
      return res.status(400).json({
        success: false,
        message: "Please provide employeeId and status",
      });
    }

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Use provided date or current date
    const attendanceDate = date ? new Date(date) : new Date();
    // Set time to start of day for consistent date comparison
    attendanceDate.setHours(0, 0, 0, 0);

    // Check if attendance already marked for this date
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: attendanceDate,
    });

    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.status = status;
      await existingAttendance.save();

      return res.status(200).json({
        success: true,
        message: "Attendance updated successfully",
        data: existingAttendance,
      });
    }

    // Create new attendance
    const attendance = await Attendance.create({
      employeeId,
      date: attendanceDate,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get attendance history for a specific employee
// @route   GET /api/attendance/:employeeId
// @access  Public
const getAttendanceHistory = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const attendance = await Attendance.find({ employeeId })
      .populate("employeeId", "name email role")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Public
const getAllAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    let query = {};
    if (date) {
      const filterDate = new Date(date);
      filterDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(filterDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query.date = { $gte: filterDate, $lt: nextDay };
    }

    const attendance = await Attendance.find(query)
      .populate("employeeId", "name email role")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get dashboard summary
// @route   GET /api/attendance/dashboard/summary
// @access  Public
const getDashboardSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Total employees
    const totalEmployees = await Employee.countDocuments();

    // Today's attendance
    const todayAttendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
    }).populate("employeeId", "name email role");

    const presentToday = todayAttendance.filter(
      (a) => a.status === "Present"
    ).length;
    const absentToday = todayAttendance.filter(
      (a) => a.status === "Absent"
    ).length;

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        presentToday,
        absentToday,
        todayAttendance,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAttendanceHistory,
  getAllAttendance,
  getDashboardSummary,
};

