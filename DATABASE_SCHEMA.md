# Roomie App - Complete Database Schema

## 📊 Database: MongoDB (NoSQL)

**Total Collections**: 7

---

## 1️⃣ Users Collection

**Purpose**: Store all user accounts and profiles

```javascript
{
  _id: ObjectId,
  name: String,              // "John Doe"
  email: String,             // "john@email.com" (unique, indexed)
  password: String,          // Hashed with bcrypt
  avatar: String,            // "JD" or URL to image
  phone: String,             // "+250 123 456 789"
  bio: String,               // "Looking for roommates..."
  location: String,          // "Kigali, Rwanda"
  
  // Roommate Preferences
  preferences: {
    cleanliness: Number,     // 1-5 scale
    smoking: Boolean,
    pets: Boolean,
    nightOwl: Boolean,
    earlyBird: Boolean,
    guests: Boolean,
    noise: Number,           // 1-5 scale
    sharing: Boolean
  },
  
  // Lifestyle
  lifestyle: {
    occupation: String,      // "Software Developer"
    age: Number,
    gender: String,
    interests: [String],     // ["Reading", "Sports"]
    languages: [String]      // ["English", "French"]
  },
  
  // Schedule
  schedule: {
    workFromHome: Boolean,
    workHours: String,       // "9-5"
    weekendRoutine: String
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `email` (unique)
- `createdAt`

---

## 2️⃣ Properties Collection

**Purpose**: Store property listings

```javascript
{
  _id: ObjectId,
  ownerId: ObjectId,         // Reference to Users
  
  // Basic Info
  title: String,             // "Rose Garden Apartments"
  description: String,
  location: String,          // "Nyarutarama, Kigali"
  address: String,           // Full address
  
  // Property Details
  type: String,              // "Apartment", "House", "Villa", "Studio"
  bedrooms: Number,
  bathrooms: Number,
  size: Number,              // Square meters
  furnished: Boolean,
  
  // Pricing
  price: Number,             // 340
  priceType: String,         // "month" or "night"
  currency: String,          // "USD"
  deposit: Number,
  
  // Media
  images: [String],          // Array of Cloudinary URLs
  videos: [String],
  
  // Amenities
  amenities: [String],       // ["WiFi", "AC", "Parking", "Pool"]
  
  // Shared Space Info
  isShared: Boolean,
  availableRooms: Number,
  currentRoommates: [{
    name: String,
    age: Number,
    occupation: String,
    bio: String,
    avatar: String
  }],
  
  // Status
  status: String,            // "available", "rented", "pending"
  availableFrom: Date,
  
  // Stats
  views: Number,
  rating: Number,            // Average rating
  reviewCount: Number,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `ownerId`
- `location`
- `price`
- `type`
- `status`
- `createdAt`

---

## 3️⃣ Bookings Collection

**Purpose**: Store booking requests and reservations

```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to Users (tenant)
  propertyId: ObjectId,      // Reference to Properties
  ownerId: ObjectId,         // Reference to Users (property owner)
  
  // Booking Details
  checkIn: Date,
  checkOut: Date,
  duration: Number,          // Days
  guests: Number,
  specialNeeds: String,
  
  // Pricing
  pricePerDay: Number,
  subtotal: Number,
  tax: Number,
  total: Number,
  
  // Status
  status: String,            // "pending", "approved", "declined", "cancelled", "completed"
  
  // Communication
  message: String,           // Message from tenant
  ownerResponse: String,     // Response from owner
  
  // Payment (future)
  paymentStatus: String,     // "pending", "paid", "refunded"
  paymentMethod: String,
  transactionId: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `userId`
- `propertyId`
- `ownerId`
- `status`
- `checkIn`
- `createdAt`

---

## 4️⃣ MatchRequests Collection

**Purpose**: Store roommate match requests

```javascript
{
  _id: ObjectId,
  fromUserId: ObjectId,      // User sending request
  toUserId: ObjectId,        // User receiving request
  
  // Match Info
  compatibilityScore: Number, // 0-100
  message: String,
  
  // Status
  status: String,            // "pending", "approved", "declined"
  
  // Contact Info (revealed after approval)
  contactRevealed: Boolean,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `fromUserId`
- `toUserId`
- `status`
- `createdAt`

---

## 5️⃣ Notifications Collection

**Purpose**: Store user notifications

```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // User receiving notification
  
  // Notification Details
  type: String,              // "booking", "match", "room_application", "message"
  title: String,             // "New Booking Request"
  message: String,           // "John Doe wants to book your property"
  
  // Related Data
  relatedId: ObjectId,       // ID of booking/match/etc
  relatedType: String,       // "booking", "match", "property"
  
  // Sender Info
  senderId: ObjectId,
  senderName: String,
  senderAvatar: String,
  
  // Status
  read: Boolean,
  actionTaken: Boolean,      // Has user responded?
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `userId`
- `read`
- `type`
- `createdAt`

---

## 6️⃣ Messages Collection

**Purpose**: Store chat messages between users

```javascript
{
  _id: ObjectId,
  conversationId: String,    // Unique ID for conversation
  
  // Participants
  senderId: ObjectId,
  receiverId: ObjectId,
  
  // Message Content
  message: String,
  type: String,              // "text", "image", "file"
  attachments: [String],     // URLs to files
  
  // Status
  read: Boolean,
  readAt: Date,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `conversationId`
- `senderId`
- `receiverId`
- `createdAt`

---

## 7️⃣ Favorites Collection

**Purpose**: Store user's favorite properties

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  propertyId: ObjectId,
  
  // Additional Info
  notes: String,             // Personal notes
  
  createdAt: Date
}
```

**Indexes**:
- `userId`
- `propertyId`
- Compound: `userId + propertyId` (unique)

---

## 📋 Optional Collections (Future Features)

### 8️⃣ Reviews Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Reviewer
  propertyId: ObjectId,      // Property being reviewed
  bookingId: ObjectId,       // Related booking
  
  rating: Number,            // 1-5
  comment: String,
  photos: [String],
  
  // Response
  ownerResponse: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

### 9️⃣ Payments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  bookingId: ObjectId,
  
  amount: Number,
  currency: String,
  method: String,            // "card", "mobile_money"
  status: String,            // "pending", "completed", "failed"
  
  transactionId: String,
  provider: String,          // "stripe", "paypal"
  
  createdAt: Date,
  updatedAt: Date
}
```

### 🔟 Reports Collection
```javascript
{
  _id: ObjectId,
  reporterId: ObjectId,
  reportedId: ObjectId,      // User or Property
  reportedType: String,      // "user" or "property"
  
  reason: String,
  description: String,
  status: String,            // "pending", "reviewed", "resolved"
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔗 Relationships

### User → Properties (One to Many)
- One user can own multiple properties
- `Properties.ownerId` references `Users._id`

### User → Bookings (One to Many)
- One user can make multiple bookings
- `Bookings.userId` references `Users._id`

### Property → Bookings (One to Many)
- One property can have multiple bookings
- `Bookings.propertyId` references `Properties._id`

### User → MatchRequests (Many to Many)
- Users can send/receive multiple match requests
- `MatchRequests.fromUserId` and `toUserId` reference `Users._id`

### User → Notifications (One to Many)
- One user can have multiple notifications
- `Notifications.userId` references `Users._id`

### User → Messages (Many to Many)
- Users can message multiple users
- `Messages.senderId` and `receiverId` reference `Users._id`

### User → Favorites (Many to Many)
- Users can favorite multiple properties
- `Favorites.userId` references `Users._id`
- `Favorites.propertyId` references `Properties._id`

---

## 📊 Database Statistics

**Total Collections**: 7 (core) + 3 (optional) = 10

**Estimated Storage** (for 1000 users):
- Users: ~5 MB
- Properties: ~10 MB
- Bookings: ~3 MB
- MatchRequests: ~2 MB
- Notifications: ~5 MB
- Messages: ~20 MB
- Favorites: ~1 MB

**Total**: ~46 MB (very small, MongoDB free tier supports 512 MB)

---

## 🔐 Security Considerations

### Sensitive Fields
- `Users.password` - Always hashed with bcrypt
- `Users.email` - Indexed, unique
- `Users.phone` - Hidden until match approved

### Access Control
- Users can only:
  - Read their own data
  - Update their own profile
  - Delete their own listings
  - View approved matches' contact info

### Validation
- Email format validation
- Password strength requirements
- Phone number format
- Price must be positive
- Dates must be valid

---

## 📝 Sample Data

### Sample User
```javascript
{
  name: "John Doe",
  email: "john@email.com",
  password: "$2a$10$...", // hashed
  avatar: "JD",
  phone: "+250 123 456 789",
  bio: "Software developer looking for roommates",
  location: "Kigali, Rwanda",
  preferences: {
    cleanliness: 4,
    smoking: false,
    pets: true,
    nightOwl: false,
    earlyBird: true
  }
}
```

### Sample Property
```javascript
{
  ownerId: "user123",
  title: "Rose Garden Apartments",
  description: "Beautiful 2-bedroom apartment",
  location: "Nyarutarama, Kigali",
  type: "Apartment",
  bedrooms: 2,
  bathrooms: 1,
  price: 340,
  priceType: "month",
  images: ["https://cloudinary.com/..."],
  amenities: ["WiFi", "AC", "Parking"],
  isShared: false,
  status: "available"
}
```

### Sample Booking
```javascript
{
  userId: "user456",
  propertyId: "prop123",
  ownerId: "user123",
  checkIn: "2024-02-01",
  checkOut: "2024-02-15",
  duration: 14,
  total: 158.80,
  status: "pending"
}
```

---

## 🚀 Implementation Steps

### Step 1: Create Models (Already Done ✅)
Your models are already created in `backend/models/`

### Step 2: Connect to MongoDB Atlas
Follow BACKEND_STEPS.md Step 1

### Step 3: Seed Initial Data
Create `backend/seeds/seedData.js`:
```javascript
const User = require('../models/User');
const Property = require('../models/Property');

const seedUsers = async () => {
  await User.create([
    { name: "John Doe", email: "john@email.com", ... },
    { name: "Sarah Smith", email: "sarah@email.com", ... },
    { name: "Alex Johnson", email: "alex@email.com", ... }
  ]);
};

const seedProperties = async () => {
  await Property.create([
    { title: "Rose Garden", ... },
    { title: "Green Palm Stay", ... }
  ]);
};
```

### Step 4: Test Database Operations
```javascript
// Create
const user = await User.create({ name: "Test", email: "test@email.com" });

// Read
const users = await User.find();
const user = await User.findById(id);

// Update
await User.findByIdAndUpdate(id, { name: "New Name" });

// Delete
await User.findByIdAndDelete(id);
```

---

## 📚 MongoDB Queries You'll Need

### Find all properties in a location
```javascript
Property.find({ location: /Kigali/i })
```

### Find available properties under $500
```javascript
Property.find({ 
  status: "available", 
  price: { $lt: 500 } 
})
```

### Find user's bookings
```javascript
Booking.find({ userId: userId })
  .populate('propertyId')
  .sort({ createdAt: -1 })
```

### Find unread notifications
```javascript
Notification.find({ 
  userId: userId, 
  read: false 
}).sort({ createdAt: -1 })
```

### Find compatible roommates
```javascript
User.find({
  'preferences.smoking': false,
  'preferences.pets': true,
  'preferences.cleanliness': { $gte: 3 }
})
```

---

## ✅ Checklist

- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Connection string obtained
- [ ] Models reviewed and understood
- [ ] Indexes planned
- [ ] Sample data prepared
- [ ] Database connected
- [ ] First document created
- [ ] Queries tested

---

**Your database schema is complete and ready to use! All models are already created in `backend/models/`. Just connect to MongoDB Atlas and start using them! 🚀**
