import { useState, useEffect } from "react";
import { getDashboardSummary } from "../api/api";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    todayAttendance: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchSummary();
    // Refresh every 30 seconds
    const interval = setInterval(fetchSummary, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await getDashboardSummary();
      setSummary(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch dashboard data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(summary.todayAttendance.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAttendance = summary.todayAttendance.slice(startIndex, endIndex);

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => {
      const totalPages = Math.ceil(summary.todayAttendance.length / itemsPerPage);
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
  }, [summary.todayAttendance.length]);

  // Reset to page 1 when attendance changes
  useEffect(() => {
    setCurrentPage(1);
  }, [summary.todayAttendance.length]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={fetchSummary}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm sm:text-base"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm sm:text-base">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase">Total Employees</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">{summary.totalEmployees}</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase">Present Today</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">{summary.presentToday}</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-red-500 sm:col-span-2 lg:col-span-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase">Absent Today</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">{summary.absentToday}</p>
        </div>
      </div>

      {/* Today's Attendance Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
            Today's Attendance ({formatDate(new Date())})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary.todayAttendance.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-3 sm:px-6 py-4 text-center text-gray-500 text-sm sm:text-base">
                    No attendance marked for today yet.
                  </td>
                </tr>
              ) : (
                currentAttendance.map((attendance) => (
                  <tr key={attendance._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      {attendance.employeeId?.name || "N/A"}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {attendance.employeeId?.email || "N/A"}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {attendance.employeeId?.role || "N/A"}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          attendance.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {attendance.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {summary.todayAttendance.length > 0 && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, summary.todayAttendance.length)} of {summary.todayAttendance.length} records
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
    </div>
  );
};

export default Dashboard;

