const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const MatchRequest = require('../models/MatchRequest');
const Notification = require('../models/Notification');
const Message = require('../models/Message');
const Favorite = require('../models/Favorite');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roomie-app');
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed Users
const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = [
    {
      name: 'John Doe',
      email: 'john@email.com',
      password: hashedPassword,
      avatar: 'JD',
      phone: '+250 123 456 789',
      bio: 'Software developer looking for a comfortable place',
      location: 'Kigali, Rwanda'
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@email.com',
      password: hashedPassword,
      avatar: 'SS',
      phone: '+250 987 654 321',
      bio: 'Property owner with multiple listings',
      location: 'Kigali, Rwanda'
    },
    {
      name: 'Alex Johnson',
      email: 'alex@email.com',
      password: hashedPassword,
      avatar: 'AJ',
      phone: '+250 555 123 456',
      bio: 'Looking for compatible roommates',
      location: 'Kigali, Rwanda'
    }
  ];

  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);
  console.log('✅ Users seeded:', createdUsers.length);
  return createdUsers;
};

// Seed Properties
const seedProperties = async (users) => {
  const properties = [
    {
      ownerId: users[1]._id,
      title: 'Rose Garden Apartments',
      description: 'Beautiful 2-bedroom apartment in Nyarutarama',
      location: 'Nyarutarama, Kigali',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      price: 340,
      priceType: 'month',
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
      amenities: ['WiFi', 'AC', 'Parking'],
      isShared: false,
      status: 'available',
      rating: 4.8
    },
    {
      ownerId: users[1]._id,
      title: 'Green Palm Stay',
      description: 'Cozy 1-bedroom apartment',
      location: 'Kibagabaga, Gasabo',
      type: 'Apartment',
      bedrooms: 1,
      bathrooms: 1,
      price: 100,
      priceType: 'month',
      images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'],
      amenities: ['WiFi', 'Furnished'],
      isShared: false,
      status: 'available',
      rating: 4.5
    },
    {
      ownerId: users[1]._id,
      title: 'Kigali Comfort Rooms',
      description: 'Shared apartment with 2 bedrooms',
      location: 'Kicukiro, Center',
      type: 'Shared Space',
      bedrooms: 2,
      bathrooms: 1,
      price: 310,
      priceType: 'month',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
      amenities: ['WiFi', 'AC', 'Kitchen'],
      isShared: true,
      availableRooms: 1,
      currentRoommates: [{
        name: 'Emma Wilson',
        age: 25,
        occupation: 'Teacher',
        bio: 'Friendly and organized'
      }],
      status: 'available',
      rating: 4.7
    }
  ];

  await Property.deleteMany({});
  const createdProperties = await Property.insertMany(properties);
  console.log('✅ Properties seeded:', createdProperties.length);
  return createdProperties;
};

// Seed Bookings
const seedBookings = async (users, properties) => {
  const bookings = [
    {
      userId: users[0]._id,
      propertyId: properties[0]._id,
      ownerId: properties[0].ownerId,
      checkIn: new Date('2024-02-01'),
      checkOut: new Date('2024-02-15'),
      duration: 14,
      guests: 1,
      pricePerDay: 11.33,
      subtotal: 158.62,
      tax: 0.18,
      total: 158.80,
      status: 'pending',
      message: 'Looking forward to staying here!'
    },
    {
      userId: users[2]._id,
      propertyId: properties[1]._id,
      ownerId: properties[1].ownerId,
      checkIn: new Date('2024-03-01'),
      checkOut: new Date('2024-03-31'),
      duration: 30,
      guests: 1,
      pricePerDay: 3.33,
      subtotal: 100,
      tax: 0,
      total: 100,
      status: 'approved'
    }
  ];

  await Booking.deleteMany({});
  const createdBookings = await Booking.insertMany(bookings);
  console.log('✅ Bookings seeded:', createdBookings.length);
  return createdBookings;
};

// Seed Match Requests
const seedMatchRequests = async (users) => {
  const matchRequests = [
    {
      fromUserId: users[0]._id,
      toUserId: users[2]._id,
      compatibilityScore: 85,
      message: 'Hi! I think we would be great roommates!',
      status: 'pending',
      contactRevealed: false
    },
    {
      fromUserId: users[2]._id,
      toUserId: users[0]._id,
      compatibilityScore: 85,
      message: 'Would love to connect!',
      status: 'approved',
      contactRevealed: true
    }
  ];

  await MatchRequest.deleteMany({});
  const createdMatches = await MatchRequest.insertMany(matchRequests);
  console.log('✅ Match Requests seeded:', createdMatches.length);
  return createdMatches;
};

// Seed Notifications
const seedNotifications = async (users, bookings) => {
  const notifications = [
    {
      userId: users[1]._id,
      type: 'booking',
      title: 'New Booking Request',
      message: 'John Doe wants to book Rose Garden Apartments',
      relatedId: bookings[0]._id,
      relatedType: 'booking',
      senderId: users[0]._id,
      senderName: 'John Doe',
      senderAvatar: 'JD',
      read: false,
      actionTaken: false
    },
    {
      userId: users[0]._id,
      type: 'match',
      title: 'Match Request Approved',
      message: 'Alex Johnson approved your roommate request',
      relatedId: users[2]._id,
      relatedType: 'match',
      senderId: users[2]._id,
      senderName: 'Alex Johnson',
      senderAvatar: 'AJ',
      read: false,
      actionTaken: false
    },
    {
      userId: users[2]._id,
      type: 'booking',
      title: 'Booking Approved',
      message: 'Your booking for Green Palm Stay has been approved',
      relatedId: bookings[1]._id,
      relatedType: 'booking',
      senderId: users[1]._id,
      senderName: 'Sarah Smith',
      senderAvatar: 'SS',
      read: true,
      actionTaken: true
    }
  ];

  await Notification.deleteMany({});
  const createdNotifications = await Notification.insertMany(notifications);
  console.log('✅ Notifications seeded:', createdNotifications.length);
  return createdNotifications;
};

// Seed Messages
const seedMessages = async (users) => {
  const conversationId1 = `${users[0]._id}_${users[1]._id}`;
  const conversationId2 = `${users[0]._id}_${users[2]._id}`;

  const messages = [
    {
      conversationId: conversationId1,
      senderId: users[0]._id,
      receiverId: users[1]._id,
      message: 'Hi! Is the Rose Garden apartment still available?',
      type: 'text',
      read: true,
      readAt: new Date()
    },
    {
      conversationId: conversationId1,
      senderId: users[1]._id,
      receiverId: users[0]._id,
      message: 'Yes, it is! Would you like to schedule a viewing?',
      type: 'text',
      read: true,
      readAt: new Date()
    },
    {
      conversationId: conversationId2,
      senderId: users[2]._id,
      receiverId: users[0]._id,
      message: 'Hey! I saw your roommate profile. We have similar interests!',
      type: 'text',
      read: false
    }
  ];

  await Message.deleteMany({});
  const createdMessages = await Message.insertMany(messages);
  console.log('✅ Messages seeded:', createdMessages.length);
  return createdMessages;
};

// Seed Favorites
const seedFavorites = async (users, properties) => {
  const favorites = [
    {
      userId: users[0]._id,
      propertyId: properties[0]._id,
      notes: 'Love the location!'
    },
    {
      userId: users[0]._id,
      propertyId: properties[2]._id,
      notes: 'Good for shared living'
    },
    {
      userId: users[2]._id,
      propertyId: properties[1]._id
    }
  ];

  await Favorite.deleteMany({});
  const createdFavorites = await Favorite.insertMany(favorites);
  console.log('✅ Favorites seeded:', createdFavorites.length);
  return createdFavorites;
};

// Main seed function
const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('\n🌱 Starting database seeding...\n');
    
    const users = await seedUsers();
    const properties = await seedProperties(users);
    const bookings = await seedBookings(users, properties);
    const matchRequests = await seedMatchRequests(users);
    const notifications = await seedNotifications(users, bookings);
    const messages = await seedMessages(users);
    const favorites = await seedFavorites(users, properties);
    
    console.log('\n✅ Database seeding completed!\n');
    console.log('📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Properties: ${properties.length}`);
    console.log(`   - Bookings: ${bookings.length}`);
    console.log(`   - Match Requests: ${matchRequests.length}`);
    console.log(`   - Notifications: ${notifications.length}`);
    console.log(`   - Messages: ${messages.length}`);
    console.log(`   - Favorites: ${favorites.length}`);
    console.log('\n🔐 Test Accounts (password: password123):');
    console.log('   - john@email.com');
    console.log('   - sarah@email.com');
    console.log('   - alex@email.com\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
