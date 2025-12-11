# Roomie App - Complete Startup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit backend/.env file:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/roomie-app
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d

# Start MongoDB (if using local)
# Windows: mongod
# Mac/Linux: sudo systemctl start mongod

# Seed database with sample data (optional)
npm run seed

# Start backend server
npm start
# Server runs at http://localhost:5000
```

### 2. Frontend Setup

```bash
# Navigate to root folder
cd ..

# Install dependencies
npm install

# Configure environment variables
# Edit .env file:
REACT_APP_API_URL=http://localhost:5000/api

# Start frontend
npm start
# App runs at http://localhost:3000
```

## Verify Everything Works

### Backend Health Check
Open browser: http://localhost:5000
Should see: `{"message": "Roomie App API is running"}`

### Test API Endpoints
```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test properties
curl http://localhost:5000/api/properties
```

### Frontend Check
1. Open http://localhost:3000
2. Should see Onboarding page
3. Click "Get Started"
4. Register a new account
5. Login and explore

## Common Issues & Solutions

### Issue: Backend won't start
**Solution:** 
- Check if MongoDB is running
- Verify MONGODB_URI in backend/.env
- Check if port 5000 is available

### Issue: Frontend can't connect to backend
**Solution:**
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in .env
- Clear browser cache and restart

### Issue: Database is empty
**Solution:**
```bash
cd backend
npm run seed
```

### Issue: CORS errors
**Solution:**
- Backend already has CORS enabled
- Make sure API_URL matches backend URL

## Production Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repo
4. Set environment variables:
   - MONGODB_URI (MongoDB Atlas connection string)
   - JWT_SECRET (generate secure key)
   - NODE_ENV=production
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Set environment variable:
   - REACT_APP_API_URL=https://your-backend-url.onrender.com/api
4. Deploy

## Database Seeding

The seed script creates:
- 5 sample users
- 10 properties
- Sample bookings
- Sample messages
- Sample notifications

```bash
cd backend
npm run seed    # Add sample data
npm run clear   # Clear all data
```

## Testing User Accounts

After seeding, you can login with:
- Email: john.doe@email.com
- Password: password123

Or register your own account.

## Features to Test

### 1. Authentication
- [ ] Register new user
- [ ] Login
- [ ] Logout
- [ ] Profile displays correctly

### 2. Properties
- [ ] Browse properties on Home
- [ ] Search properties
- [ ] Filter by type, facilities, price
- [ ] View property details
- [ ] Add to favorites
- [ ] Book property

### 3. Roommate Matching
- [ ] View potential roommates
- [ ] See match scores
- [ ] Send match request
- [ ] View match profile

### 4. Listings
- [ ] List new property
- [ ] View my listings
- [ ] Edit listing
- [ ] Delete listing

### 5. Bookings
- [ ] Create booking
- [ ] View booking requests (as owner)
- [ ] Accept/Decline booking
- [ ] Receive notifications

### 6. Messages
- [ ] Send message
- [ ] View messages
- [ ] Unread count updates

### 7. Profile
- [ ] View profile stats
- [ ] Edit profile
- [ ] View favorites
- [ ] View notifications

## API Documentation

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Properties
- GET `/api/properties` - Get all properties
- GET `/api/properties/:id` - Get property by ID
- POST `/api/properties` - Create property
- PUT `/api/properties/:id` - Update property
- DELETE `/api/properties/:id` - Delete property
- GET `/api/properties/owner/:ownerId` - Get owner's properties
- POST `/api/properties/:id/roommates` - Add roommate

### Bookings
- GET `/api/bookings` - Get all bookings
- GET `/api/bookings/:id` - Get booking by ID
- POST `/api/bookings` - Create booking
- PATCH `/api/bookings/:id/status` - Update booking status
- GET `/api/bookings/guest/:guestId` - Get guest's bookings
- GET `/api/bookings/owner/:ownerId` - Get owner's bookings

### Roommates
- GET `/api/roommates/potential/:userId` - Get potential matches
- POST `/api/roommates/matches` - Create match request

### Favorites
- GET `/api/favorites/:userId` - Get user's favorites
- POST `/api/favorites` - Add favorite
- DELETE `/api/favorites/:userId/:propertyId` - Remove favorite
- GET `/api/favorites/check/:userId/:propertyId` - Check if favorite

### Messages
- GET `/api/messages/user/:userId` - Get user's messages
- POST `/api/messages` - Send message
- PATCH `/api/messages/:id/read` - Mark as read

### Notifications
- GET `/api/notifications/:userId` - Get user's notifications
- POST `/api/notifications` - Create notification
- PATCH `/api/notifications/:id/read` - Mark as read

### Reviews
- GET `/api/reviews/property/:propertyId` - Get property reviews
- POST `/api/reviews` - Create review

### Users
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user

## Support

For issues or questions:
1. Check this guide
2. Review PRODUCTION_CHECKLIST.md
3. Check console for errors
4. Verify environment variables

## Success Indicators

✅ Backend running on port 5000
✅ Frontend running on port 3000
✅ Can register and login
✅ Properties display on Home page
✅ Search and filters work
✅ Can book properties
✅ Notifications appear
✅ Profile stats show real data
✅ Roommate matching works
✅ Currency displays in RWF

Your app is ready when all indicators are ✅!
