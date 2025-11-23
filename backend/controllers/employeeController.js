const Employee = require("../models/Employee");

// @desc    Add new employee
// @route   POST /api/employees
// @access  Public
const addEmployee = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and role",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      role,
    });

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
};

