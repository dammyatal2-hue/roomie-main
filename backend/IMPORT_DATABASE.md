# 🗄️ Database Import Instructions

## All 7 Collections Will Be Created

This seed script creates and populates ALL database tables (collections):

1. ✅ **Users** - 3 test accounts
2. ✅ **Properties** - 3 property listings
3. ✅ **Bookings** - 2 booking requests
4. ✅ **MatchRequests** - 2 roommate match requests
5. ✅ **Notifications** - 3 notifications
6. ✅ **Messages** - 3 chat messages
7. ✅ **Favorites** - 3 favorite properties

---

## 🚀 Quick Import Command

### Step 1: Navigate to backend folder
```bash
cd backend
```

### Step 2: Run the seed command
```bash
npm run seed
```

That's it! All 7 collections will be created and populated with sample data.

---

## ✅ What Gets Created

### Users (3)
- john@email.com (password: password123)
- sarah@email.com (password: password123)
- alex@email.com (password: password123)

### Properties (3)
- Rose Garden Apartments ($340/month)
- Green Palm Stay ($100/month)
- Kigali Comfort Rooms ($310/month, shared)

### Bookings (2)
- John booking Rose Garden (pending)
- Alex booking Green Palm Stay (approved)

### Match Requests (2)
- John → Alex (pending)
- Alex → John (approved)

### Notifications (3)
- New booking request for Sarah
- Match approved for John
- Booking approved for Alex

### Messages (3)
- Conversation between John & Sarah
- Message from Alex to John

### Favorites (3)
- John's favorite properties
- Alex's favorite property

---

## 🔍 Verify Import

After running `npm run seed`, you should see:

```
🌱 Starting database seeding...

✅ Users seeded: 3
✅ Properties seeded: 3
✅ Bookings seeded: 2
✅ Match Requests seeded: 2
✅ Notifications seeded: 3
✅ Messages seeded: 3
✅ Favorites seeded: 7

✅ Database seeding completed!

📊 Summary:
   - Users: 3
   - Properties: 3
   - Bookings: 2
   - Match Requests: 2
   - Notifications: 3
   - Messages: 3
   - Favorites: 3

🔐 Test Accounts (password: password123):
   - john@email.com
   - sarah@email.com
   - alex@email.com
```

---

## 🔄 Re-import (Clear & Reimport)

The seed script automatically clears existing data before importing. Just run:

```bash
npm run seed
```

---

## 🛠️ Troubleshooting

### Error: "Cannot find module"
```bash
npm install
```

### Error: "MongoDB connection failed"
Check your `.env` file has correct `MONGODB_URI`

### Error: "Model not found"
Make sure all model files exist in `backend/models/`

---

## 📝 Required Model Files

Ensure these files exist in `backend/models/`:
- ✅ User.js
- ✅ Property.js
- ✅ Booking.js
- ✅ MatchRequest.js
- ✅ Notification.js
- ✅ Message.js
- ✅ Favorite.js

---

## 🎯 Next Steps

After importing database:

1. Start backend: `npm run dev`
2. Start frontend: `cd .. && npm start`
3. Login with test accounts
4. See real data from database!

---

**All 7 collections are now ready to use! 🚀**
