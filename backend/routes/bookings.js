const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');
const { sendBookingRequestEmail } = require('../services/emailService');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email avatar')
      .populate('propertyId', 'title location price')
      .populate('ownerId', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get bookings by user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('propertyId', 'title location price images')
      .populate('ownerId', 'name email phone');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get bookings by owner
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const bookings = await Booking.find({ ownerId: req.params.ownerId })
      .populate('userId', 'name email phone avatar')
      .populate('propertyId', 'title location');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create booking
router.post('/', async (req, res) => {
  try {
    const newBooking = await Booking.create({ ...req.body, status: 'pending' });
    
    const property = await Property.findById(req.body.propertyId).populate('ownerId');
    const guest = await User.findById(req.body.userId);
    
    if (property && property.ownerId && guest) {
      // Send email notification
      try {
        await sendBookingRequestEmail(
          property.ownerId.email,
          property.ownerId.name,
          guest.name,
          guest.email,
          property.title,
          req.body.checkIn,
          req.body.checkOut
        );
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
      
      // Create notification
      const Notification = require('../models/Notification');
      await Notification.create({
        userId: property.ownerId._id,
        type: 'booking',
        title: 'New Booking Request',
        message: `${guest.name} wants to book your property: ${property.title}`,
        relatedId: req.body.userId,
        read: false
      });
      
      // Create initial message
      const Message = require('../models/Message');
      await Message.create({
        senderId: req.body.userId,
        receiverId: property.ownerId._id,
        message: `Hi! I'm interested in booking your property "${property.title}". Can we discuss the details?`,
        read: false
      });
    }
    
    res.status(201).json({ booking: newBooking, ownerId: property.ownerId._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, ownerResponse: req.body.ownerResponse },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
