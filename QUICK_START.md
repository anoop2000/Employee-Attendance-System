# 🚀 Quick Start Guide - How to Run the System

Follow these step-by-step instructions to run both the **Backend** and **Frontend** of the Employee Attendance System.

---

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** installed (v16 or higher)
   - Check if installed: `node --version`
   - Download from: https://nodejs.org/

2. **npm** (comes with Node.js)
   - Check if installed: `npm --version`

3. **MongoDB Atlas Account** (Free tier works)
   - Sign up at: https://www.mongodb.com/cloud/atlas
   - We'll set this up in Step 2

---

## 🔧 Step 1: Setup MongoDB Atlas (Database)

1. Go to https://www.mongodb.com/cloud/atlas and sign up/login
2. Click **"Create"** or **"Build a Database"**
3. Choose **FREE** (M0) tier
4. Select a cloud provider and region (choose closest to you)
5. Click **"Create Cluster"** (takes 3-5 minutes)
6. While waiting, create a database user:
   - Go to **"Database Access"** → **"Add New Database User"**
   - Choose **"Password"** authentication
   - Username: `attendance_user` (or any username)
   - Password: Create a strong password (save it!)
   - Database User Privileges: **"Read and write to any database"**
   - Click **"Add User"**
7. Whitelist your IP:
   - Go to **"Network Access"** → **"Add IP Address"**
   - Click **"Add Current IP Address"** (or use `0.0.0.0/0` for all IPs - less secure but easier)
   - Click **"Confirm"**
8. Get your connection string:
   - Go to **"Database"** → Click **"Connect"** on your cluster
   - Choose **"Connect your application"**
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `attendance_db` (or any name you prefer)
   - **Save this connection string!** You'll need it in the next step

---

## 🖥️ Step 2: Setup Backend

### Open Terminal/Command Prompt

**Windows:** Press `Win + R`, type `cmd` or `powershell`, press Enter  
**Mac/Linux:** Open Terminal

### Navigate to Backend Folder

```bash
cd employee_attendance_system
cd backend
```

### Install Dependencies

```bash
npm install
```

This will install all required packages (Express, Mongoose, etc.). Wait for it to complete.

### Create .env File

Create a file named `.env` in the `backend` folder with this content:

**Option 1: Using a text editor**
- Open Notepad (Windows) or TextEdit (Mac)
- Copy and paste this:

```env
MONGODB_URI=mongodb+srv://attendance_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/attendance_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

- Replace `YOUR_PASSWORD` with your MongoDB Atlas password
- Replace the cluster URL with your actual connection string from Step 1
- Save the file as `.env` (make sure it's exactly `.env`, not `.env.txt`)
- Save it in the `backend` folder

**Option 2: Using Command Line (Windows PowerShell)**
```powershell
cd backend
@"
MONGODB_URI=mongodb+srv://attendance_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/attendance_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
"@ | Out-File -FilePath .env -Encoding utf8
```
(Don't forget to replace YOUR_PASSWORD and the connection string!)

### Start Backend Server

```bash
npm run dev
```

**You should see:**
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

✅ **Backend is now running!** Keep this terminal window open.

**If you see errors:**
- Make sure MongoDB Atlas connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Verify the password in `.env` matches your database user password

---

## 🎨 Step 3: Setup Frontend

### Open a NEW Terminal/Command Prompt Window

**Important:** Keep the backend terminal running, open a **new** terminal window for the frontend.

### Navigate to Frontend Folder

```bash
cd employee_attendance_system
cd frontend
```

### Install Dependencies

```bash
npm install
```

This will install React, Vite, Tailwind CSS, etc. Wait for it to complete (may take 1-2 minutes).

### Create .env File

Create a file named `.env` in the `frontend` folder:

**Using a text editor:**
- Open Notepad or TextEdit
- Copy and paste this:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

- Save as `.env` in the `frontend` folder

**Using Command Line (Windows PowerShell):**
```powershell
cd frontend
@"
VITE_API_BASE_URL=http://localhost:5000/api
"@ | Out-File -FilePath .env -Encoding utf8
```

### Start Frontend Server

```bash
npm run dev
```

**You should see:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **Frontend is now running!**

---

## 🌐 Step 4: Open the Application

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to: **http://localhost:5173**
3. You should see the **Employee Attendance System** homepage!

---

## ✅ Verify Everything is Working

1. **Backend Check:**
   - Open: http://localhost:5000
   - You should see: `{"message":"Employee Attendance System API","status":"Running"}`

2. **Frontend Check:**
   - Open: http://localhost:5173
   - You should see the Dashboard page

3. **Test the System:**
   - Go to **"Employees"** page
   - Add a test employee (Name, Email, Role)
   - Click **"Mark Attendance"** next to the employee
   - Mark as "Present" or "Absent"
   - Check the **"Dashboard"** to see the summary

---

## 🛑 How to Stop the Servers

**To stop the backend:**
- Go to the backend terminal
- Press `Ctrl + C`

**To stop the frontend:**
- Go to the frontend terminal
- Press `Ctrl + C`

---

## 🔄 Running Again Later

Once everything is set up, you only need to:

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open browser:** http://localhost:5173

---

## ❓ Troubleshooting

### Backend won't start
- ✅ Check if MongoDB connection string is correct in `.env`
- ✅ Make sure MongoDB Atlas cluster is running
- ✅ Verify your IP is whitelisted in MongoDB Atlas
- ✅ Check if port 5000 is already in use

### Frontend won't start
- ✅ Make sure backend is running first
- ✅ Check if `.env` file exists in frontend folder
- ✅ Verify `VITE_API_BASE_URL` is set correctly
- ✅ Try deleting `node_modules` and running `npm install` again

### Can't connect to database
- ✅ Double-check MongoDB connection string
- ✅ Verify database user password is correct
- ✅ Make sure IP is whitelisted (try `0.0.0.0/0` for testing)
- ✅ Check if cluster is fully created (wait a few minutes)

### Frontend shows errors
- ✅ Make sure backend is running on port 5000
- ✅ Check browser console (F12) for errors
- ✅ Verify `VITE_API_BASE_URL` in frontend `.env` matches backend URL

---

## 📞 Need Help?

- Check the main `README.md` for more details
- Verify all files are in the correct folders
- Make sure Node.js version is 16 or higher: `node --version`

---

**🎉 You're all set! Enjoy using the Employee Attendance System!**

