# Employee Attendance System

A complete MERN-stack application for managing employee attendance with a modern, responsive UI.

## 🚀 Tech Stack

- **Frontend**: React.js, React Router, Axios, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: 
  - Backend: Render/Railway
  - Frontend: Vercel
  - Database: MongoDB Atlas

## 📋 Features

- ✅ Add Employee
- ✅ Mark Attendance (Present/Absent)
- ✅ View Attendance History
- ✅ Dashboard Summary (Total Employees, Present Today, Absent Today)
- ✅ Real-time attendance tracking
- ✅ Clean and modern UI with Tailwind CSS

## 📁 Project Structure

```
employee-attendance-system/
│
├── backend/
│   ├── controllers/
│   │   ├── employeeController.js
│   │   └── attendanceController.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── employeeRoutes.js
│   │   └── attendanceRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Employees.jsx
    │   │   └── AttendanceHistory.jsx
    │   ├── components/
    │   │   ├── EmployeeForm.jsx
    │   │   ├── EmployeeTable.jsx
    │   │   └── MarkAttendance.jsx
    │   ├── api/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── index.js
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## 📡 API Endpoints

### Employee Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/employees` | Add new employee |
| GET | `/api/employees` | Get all employees |

### Attendance Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/attendance` | Mark attendance |
| GET | `/api/attendance/:employeeId` | Get attendance history for specific employee |
| GET | `/api/attendance` | Get all attendance records (optional query: `?date=YYYY-MM-DD`) |
| GET | `/api/attendance/dashboard/summary` | Get dashboard summary |

### Request/Response Examples

#### Add Employee
```json
POST /api/employees
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
```

#### Mark Attendance
```json
POST /api/attendance
{
  "employeeId": "employee_id_here",
  "date": "2024-01-15",
  "status": "Present"
}
```

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. Push your code to GitHub
2. Connect your repository to Render/Railway
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: (Optional, Render/Railway sets this automatically)
   - `NODE_ENV`: production
4. Deploy!

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Set environment variables:
   - `VITE_API_BASE_URL`: Your backend API URL (e.g., `https://your-backend.onrender.com/api`)
4. Deploy!

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
5. Get your connection string and add it to your `.env` file

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/attendance_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For production, update `VITE_API_BASE_URL` to your deployed backend URL.

## 🎯 Usage

1. **Add Employees**: Navigate to the Employees page and fill in the form
2. **Mark Attendance**: Click "Mark Attendance" button next to any employee
3. **View Dashboard**: See summary statistics on the Dashboard page
4. **View History**: Select an employee from the dropdown on Attendance History page

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for internship evaluation

---

**Note**: Make sure to update the `VITE_API_BASE_URL` in your frontend `.env` file when deploying to production!

