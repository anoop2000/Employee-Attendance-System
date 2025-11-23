import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

const Employees = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEmployeeAdded = () => {
    // Trigger refresh of employee table
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Employee Management</h1>
      <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
      <div key={refreshKey}>
        <EmployeeTable />
      </div>
    </div>
  );
};

export default Employees;

