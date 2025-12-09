const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const MatchRequest = require('../models/MatchRequest');
const Notification = require('../models/Notification');
const Message = require('../models/Message');
const Favorite = require('../models/Favorite');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roomie-app');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  try {
    await connectDB();
    console.log('\n🗑️  Clearing all data...\n');
    
    await User.deleteMany({});
    console.log('✅ Users cleared');
    
    await Property.deleteMany({});
    console.log('✅ Properties cleared');
    
    await Booking.deleteMany({});
    console.log('✅ Bookings cleared');
    
    await MatchRequest.deleteMany({});
    console.log('✅ Match Requests cleared');
    
    await Notification.deleteMany({});
    console.log('✅ Notifications cleared');
    
    await Message.deleteMany({});
    console.log('✅ Messages cleared');
    
    await Favorite.deleteMany({});
    console.log('✅ Favorites cleared');
    
    console.log('\n✅ All data cleared successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
