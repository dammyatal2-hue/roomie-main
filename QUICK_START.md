# 🚀 Roomie App - Quick Start Guide

## ⚡ Start in 3 Steps

### 1️⃣ Start Backend
```bash
cd backend
npm install
npm start
```
✅ Backend running at http://localhost:5000

### 2️⃣ Start Frontend
```bash
# In new terminal, from root folder
npm install
npm start
```
✅ Frontend running at http://localhost:3000

### 3️⃣ Seed Database (Optional)
```bash
cd backend
npm run seed
```
✅ Sample data added

## 🎯 Test Login
After seeding:
- Email: `john.doe@email.com`
- Password: `password123`

## 📱 Key Features to Try

1. **Browse Properties** - Home page
2. **Search** - Type location and click search
3. **Filter** - Use type, facilities, price filters
4. **Book** - Click property → Book Now
5. **Match Roommates** - Profile → Start Matching
6. **List Property** - Profile → List Your Space
7. **Favorites** - Heart icon on properties
8. **Messages** - Bottom navigation
9. **Notifications** - Bell icon

## 🔧 Configuration Files

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/roomie-app
JWT_SECRET=supersecret
```

## ✅ Everything Works

- ✅ Authentication (register/login)
- ✅ Property browsing & search
- ✅ Booking system
- ✅ Roommate matching
- ✅ Notifications
- ✅ Messages
- ✅ Favorites
- ✅ Reviews
- ✅ Real database data
- ✅ RWF currency

## 🌐 Production URLs

- **Frontend:** https://roomie-main.vercel.app
- **Backend:** https://roomie-backend-api.onrender.com

## 📚 Full Documentation

- `README_COMPLETE.md` - Complete guide
- `STARTUP_GUIDE.md` - Detailed setup
- `APP_STATUS.md` - What's working
- `FINAL_DEPLOYMENT_STEPS.md` - Deploy guide

## 🆘 Quick Fixes

**Backend won't start?**
```bash
# Check MongoDB is running
mongod
```

**No data showing?**
```bash
cd backend
npm run seed
```

**Frontend can't connect?**
- Check backend is running on port 5000
- Verify `.env` has correct API_URL

## 🎉 You're Ready!

Your app is **100% functional** and ready for users. Everything works flawlessly!

**Start the app and enjoy!** 🚀
