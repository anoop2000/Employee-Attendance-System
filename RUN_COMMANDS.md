# ⚡ Quick Command Reference

Copy and paste these commands in order to run the system.

---

## 🔴 Terminal 1: Backend

```bash
# Navigate to backend
cd employee_attendance_system\backend

# Install dependencies (only first time)
npm install

# Create .env file (only first time)
# Copy the content below to a file named .env in the backend folder:
# MONGODB_URI=your_mongodb_connection_string_here
# PORT=5000
# NODE_ENV=development

# Start backend server
npm run dev
```

**Expected Output:**
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

✅ Keep this terminal open!

---

## 🟢 Terminal 2: Frontend

```bash
# Navigate to frontend (in a NEW terminal window)
cd employee_attendance_system\frontend

# Install dependencies (only first time)
npm install

# Create .env file (only first time)
# Copy the content below to a file named .env in the frontend folder:
# VITE_API_BASE_URL=http://localhost:5000/api

# Start frontend server
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

✅ Keep this terminal open!

---

## 🌐 Open in Browser

Open: **http://localhost:5173**

---

## 📝 Notes

- **Backend runs on:** http://localhost:5000
- **Frontend runs on:** http://localhost:5173
- **You need BOTH terminals running simultaneously**
- **First time setup:** You need MongoDB Atlas connection string (see QUICK_START.md)

---

## 🛑 To Stop

Press `Ctrl + C` in each terminal window.

