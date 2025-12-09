# Database Setup Guide

## Option 1: Local MongoDB (Recommended for Development)

### Install MongoDB
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

### Start the Backend
```bash
cd backend
npm run dev
```

## Option 2: MongoDB Atlas (Cloud Database)

### Setup
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roomie-app
```

## Option 3: Use Mock Data (No Database Required)

The backend currently works with in-memory mock data. No database installation needed for testing.

## Database Models

- **User**: User accounts and profiles
- **Property**: Property listings
- **Booking**: Booking requests
- **MatchRequest**: Roommate match requests
- **Notification**: User notifications

## Verify Connection

When you start the server, you should see:
```
MongoDB connected successfully
Server running on port 5000
```

If MongoDB is not installed, the backend will still work with mock data in memory.
