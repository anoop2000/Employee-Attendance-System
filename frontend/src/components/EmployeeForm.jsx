import { useState } from "react";
import { addEmployee } from "../api/api";

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    role: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.length < 3) {
      return "Name must be at least 3 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Name can only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  const validateRole = (role) => {
    if (!role.trim()) {
      return "Role is required";
    }
    if (!/^[a-zA-Z\s]+$/.test(role)) {
      return "Role can only contain letters and spaces";
    }
    return "";
  };

  // Real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    let error = "";
    if (name === "name") {
      error = validateName(value);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "role") {
      error = validateRole(value);
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.role.trim() &&
      !errors.name &&
      !errors.email &&
      !errors.role
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const roleError = validateRole(formData.role);

    setErrors({
      name: nameError,
      email: emailError,
      role: roleError,
    });

    setTouched({
      name: true,
      email: true,
      role: true,
    });

    // Prevent submission if any field is invalid
    if (nameError || emailError || roleError) {
      setMessage("Please fix all errors before submitting.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addEmployee(formData);
      setMessage("Employee added successfully!");
      setFormData({ name: "", email: "", role: "" });
      setErrors({ name: "", email: "", role: "" });
      setTouched({ name: false, email: false, role: false });
      if (onEmployeeAdded) {
        onEmployeeAdded();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to add employee. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              touched.name && errors.name
                ? "border-red-500"
                : touched.name && !errors.name
                ? "border-green-500"
                : "border-gray-300"
            }`}
            placeholder="Enter employee name"
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              touched.email && errors.email
                ? "border-red-500"
                : touched.email && !errors.email
                ? "border-green-500"
                : "border-gray-300"
            }`}
            placeholder="Enter email address"
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              touched.role && errors.role
                ? "border-red-500"
                : touched.role && !errors.role
                ? "border-green-500"
                : "border-gray-300"
            }`}
            placeholder="Enter role (e.g., Developer, Manager)"
          />
          {touched.role && errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !isFormValid()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;

