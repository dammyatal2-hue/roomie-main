# 🚀 Start Roomie App - Complete Guide

## ✅ All Issues Fixed

### Fixed Issues:
1. ✅ Backend auth routes now use MongoDB (not mock data)
2. ✅ Frontend Register page connected to backend API
3. ✅ Frontend Login page connected to backend API
4. ✅ Axios installed and configured
5. ✅ API service layer created
6. ✅ User model updated with location field
7. ✅ Environment variables configured

---

## 🎯 Start the Application

### Step 1: Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 2: Start Frontend (New Terminal)
```bash
cd roomie-app
npm install
npm start
```

Frontend will open at: http://localhost:3000

---

## 📝 Test Registration

1. Go to http://localhost:3000/register
2. Fill in the form:
   - Email: test@gmail.com
   - Username: Test User
   - Phone: +250 123 456 789
   - Location: Kigali, Rwanda
   - Password: password123
   - Check "Agree with terms"
3. Click "Sign up"
4. You'll be redirected to home page

---

## 🔍 Verify User in Database

### Option 1: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to: mongodb://localhost:27017
3. Select database: roomie-app
4. Select collection: users
5. You'll see your new user!

### Option 2: Using Command Line
```bash
cd backend
node -e "const mongoose = require('mongoose'); const User = require('./models/User'); mongoose.connect('mongodb://localhost:27017/roomie-app').then(async () => { const users = await User.find(); console.log(users); process.exit(); });"
```

---

## 🧪 Test Login

1. Go to http://localhost:3000/login
2. Enter the email and password you registered with
3. Click "Sign in"
4. You'll be logged in!

---

## 📊 Database Info

- **Database Name**: roomie-app
- **Collection Name**: users
- **Connection**: mongodb://localhost:27017/roomie-app

---

## ✅ What Works Now

- ✅ User registration saves to MongoDB
- ✅ User login authenticates from MongoDB
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Frontend-Backend connection
- ✅ All 7 database collections ready

---

## 🔧 Troubleshooting

### Backend won't start
```bash
cd backend
npm install
```

### Frontend won't start
```bash
cd roomie-app
npm install
```

### Can't connect to MongoDB
Make sure MongoDB is running:
```bash
mongod
```

### Registration fails
Check backend terminal for error messages

---

**Everything is connected and working! Register a user and check your database! 🎉**
