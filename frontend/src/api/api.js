import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const API = axios.create({
  baseURL: API_BASE_URL,
});

// Employee API calls
export const addEmployee = (data) => API.post("/employees", data);
export const getEmployees = () => API.get("/employees");

// Attendance API calls
export const markAttendance = (data) => API.post("/attendance", data);
export const getAttendanceHistory = (employeeId) =>
  API.get(`/attendance/${employeeId}`);
export const getAllAttendance = (date) => {
  const params = date ? { date } : {};
  return API.get("/attendance", { params });
};
export const getDashboardSummary = () =>
  API.get("/attendance/dashboard/summary");

