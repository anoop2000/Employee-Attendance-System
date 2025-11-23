import { useState } from "react";
import { markAttendance } from "../api/api";

const MarkAttendance = ({ employee, onAttendanceMarked }) => {
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await markAttendance({
        employeeId: employee._id,
        date: date,
        status: status,
      });
      setMessage("Attendance marked successfully!");
      setTimeout(() => {
        if (onAttendanceMarked) {
          onAttendanceMarked();
        }
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to mark attendance. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
      >
        {loading ? "Marking..." : "Mark Attendance"}
      </button>
      {message && (
        <p
          className={`text-xs sm:text-sm text-center ${
            message.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default MarkAttendance;

