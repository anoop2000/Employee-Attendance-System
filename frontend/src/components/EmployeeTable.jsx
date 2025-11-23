import { useState, useEffect } from "react";
import { getEmployees } from "../api/api";
import MarkAttendance from "./MarkAttendance";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees();
      setEmployees(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch employees. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = (employee) => {
    setSelectedEmployee(employee);
    setShowAttendanceModal(true);
  };

  const handleAttendanceMarked = () => {
    setShowAttendanceModal(false);
    setSelectedEmployee(null);
  };

  // Pagination calculations
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => {
      const totalPages = Math.ceil(employees.length / itemsPerPage);
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
  }, [employees.length]);

  // Reset to page 1 when employees list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [employees.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading employees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Employee List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-3 sm:px-6 py-4 text-center text-gray-500 text-sm sm:text-base">
                    No employees found. Add your first employee above.
                  </td>
                </tr>
              ) : (
                currentEmployees.map((employee) => (
                  <tr key={employee._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {employee.email}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {employee.role}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                      <button
                        onClick={() => handleMarkAttendance(employee)}
                        className="w-full sm:w-auto bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-xs sm:text-sm"
                      >
                        Mark Attendance
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {employees.length > 0 && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, employees.length)} of {employees.length} employees
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

      {showAttendanceModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Mark Attendance for {selectedEmployee.name}
              </h3>
              <button
                onClick={() => {
                  setShowAttendanceModal(false);
                  setSelectedEmployee(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <MarkAttendance
              employee={selectedEmployee}
              onAttendanceMarked={handleAttendanceMarked}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;

