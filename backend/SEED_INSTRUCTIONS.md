# Database Seeding Instructions

## 🎯 What This Does

Creates initial data in your database:
- **3 Users** (John, Sarah, Alex)
- **3 Properties** (apartments and shared spaces)
- All with realistic data

## 📋 Steps to Seed Database

### Step 1: Make Sure MongoDB is Connected

Your `.env` file should have:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roomie-app
```

OR for local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/roomie-app
```

### Step 2: Run Seed Command

```bash
cd backend
npm run seed
```

### Step 3: Verify Success

You should see:
```
🌱 Starting database seeding...

✅ Users seeded: 3
✅ Properties seeded: 3

✅ Database seeding completed!

📊 Summary:
   - Users: 3
   - Properties: 3

🔐 Test Accounts (password: password123):
   - john@email.com
   - sarah@email.com
   - alex@email.com
```

## 🔐 Test Accounts

After seeding, you can login with:

| Email | Password | Description |
|-------|----------|-------------|
| john@email.com | password123 | Regular user |
| sarah@email.com | password123 | Property owner |
| alex@email.com | password123 | Roommate seeker |

## 📊 Seeded Data

### Users (3)
- John Doe - Software developer
- Sarah Smith - Property owner
- Alex Johnson - Looking for roommates

### Properties (3)
1. **Rose Garden Apartments**
   - 2 bedrooms, $340/month
   - Nyarutarama, Kigali
   - Owner: Sarah

2. **Green Palm Stay**
   - 1 bedroom, $100/month
   - Kibagabaga, Gasabo
   - Owner: Sarah

3. **Kigali Comfort Rooms**
   - Shared space, $310/month
   - Kicukiro, Center
   - Owner: Sarah
   - Current roommate: Emma Wilson

## 🔄 Re-seed Database

To clear and re-seed:

```bash
npm run seed
```

This will:
1. Delete all existing data
2. Create fresh data
3. Reset everything

## ⚠️ Important Notes

- **Deletes existing data**: The seed script clears Users and Properties collections
- **Password**: All test accounts use `password123`
- **Safe to run multiple times**: Will reset to initial state

## 🐛 Troubleshooting

### Error: MongoDB connection failed
**Solution**: Check your MONGODB_URI in `.env`

### Error: Cannot find module
**Solution**: Run `npm install` in backend folder

### Error: Validation failed
**Solution**: Check that all required fields are in models

## ✅ Next Steps After Seeding

1. Start backend: `npm run dev`
2. Start frontend: `cd .. && npm start`
3. Login with: john@email.com / password123
4. Browse properties
5. Test booking system

## 🎉 Success!

Your database now has:
- ✅ 3 test users
- ✅ 3 properties
- ✅ Ready to test all features
