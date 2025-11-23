import { useState, useEffect } from "react";
import { getEmployees, getAttendanceHistory } from "../api/api";

const AttendanceHistory = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployeeId) {
      fetchAttendanceHistory(selectedEmployeeId);
    } else {
      setAttendance([]);
    }
  }, [selectedEmployeeId]);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.data);
    } catch (err) {
      setError("Failed to fetch employees. Please try again.");
      console.error(err);
    }
  };

  const fetchAttendanceHistory = async (employeeId) => {
    try {
      setLoading(true);
      setError("");
      const response = await getAttendanceHistory(employeeId);
      setAttendance(response.data.data);
    } catch (err) {
      setError("Failed to fetch attendance history. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(attendance.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAttendance = attendance.slice(startIndex, endIndex);

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => {
      const totalPages = Math.ceil(attendance.length / itemsPerPage);
      if (prev < totalPages) {
        return prev + 1;
      }
      return prev;
    });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        goToPreviousPage();
      } else if (e.key === "ArrowRight") {
        goToNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [attendance.length]);

  // Reset to page 1 when attendance changes
  useEffect(() => {
    setCurrentPage(1);
  }, [attendance.length, selectedEmployeeId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Attendance History</h1>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-2">
          Select Employee
        </label>
        <select
          id="employee"
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="w-full sm:w-full md:w-1/3 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">-- Select an employee --</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name} ({employee.email})
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm sm:text-base">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-600 text-sm sm:text-base">Loading attendance history...</div>
        </div>
      ) : selectedEmployeeId && attendance.length === 0 ? (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center text-gray-500 text-sm sm:text-base">
          No attendance records found for this employee.
        </div>
      ) : selectedEmployeeId ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Attendance Records</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Total Records: {attendance.length}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAttendance.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          record.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {record.employeeId?.name || "N/A"}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {record.employeeId?.role || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {attendance.length > 0 && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="text-xs sm:text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, attendance.length)} of {attendance.length} records
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Previous (← Arrow Key)"
                >
                  ← Previous
                </button>
                <span className="text-xs sm:text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Next (→ Arrow Key)"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center text-gray-500 text-sm sm:text-base">
          Please select an employee to view their attendance history.
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;

