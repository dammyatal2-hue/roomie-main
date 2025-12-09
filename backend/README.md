# Roomie App Backend

Node.js/Express backend API for the Roomie App.

## Features

- User authentication (register/login)
- Property management (CRUD operations)
- Booking system
- Roommate matching
- Notifications
- User profiles

## Installation

```bash
cd backend
npm install
```

## Running the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/:userId` - Get user bookings
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/status` - Update booking status

### Roommates
- `GET /api/roommates/matches` - Get all match requests
- `GET /api/roommates/matches/user/:userId` - Get user matches
- `POST /api/roommates/matches` - Create match request
- `PATCH /api/roommates/matches/:id/status` - Update match status

### Notifications
- `GET /api/notifications/user/:userId` - Get user notifications
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Test Accounts

- **Tenant**: john@email.com (password: any)
- **Property Owner**: sarah@email.com (password: any)
- **Roommate Seeker**: alex@email.com (password: any)

## Environment Variables

Create a `.env` file with:
```
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
