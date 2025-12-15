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
    console.log('Creating booking:', req.body);
    const bookingData = { ...req.body, status: 'pending' };
    if (bookingData.guestId && !bookingData.userId) {
      bookingData.userId = bookingData.guestId;
    }
    const newBooking = await Booking.create(bookingData);
    console.log('Booking created:', newBooking._id);
    
    const property = await Property.findById(req.body.propertyId).populate('ownerId');
    const guest = await User.findById(req.body.guestId || req.body.userId);
    
    console.log('Property owner:', property?.ownerId?._id);
    console.log('Guest:', guest?._id);
    
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
        console.log('Email sent to:', property.ownerId.email);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
      
      // Create notification
      const Notification = require('../models/Notification');
      const notification = await Notification.create({
        userId: property.ownerId._id,
        type: 'booking',
        title: 'New Booking Request',
        message: `${guest.name} wants to book your property: ${property.title}`,
        relatedId: req.body.userId,
        read: false
      });
      console.log('Notification created:', notification._id);
      
      // Create initial message
      const Message = require('../models/Message');
      const message = await Message.create({
        senderId: req.body.guestId || req.body.userId,
        receiverId: property.ownerId._id,
        content: `Hi! I'm interested in booking your property "${property.title}". Can we discuss the details?`,
        read: false
      });
      console.log('Message created:', message._id);
    }
    
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update booking status (accept/decline)
router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, ownerResponse: req.body.ownerResponse },
      { new: true }
    ).populate('propertyId').populate('userId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Notify guest about booking status
    const Notification = require('../models/Notification');
    const statusText = req.body.status === 'approved' ? 'accepted' : 'declined';
    await Notification.create({
      userId: booking.userId._id,
      type: 'booking',
      title: `Booking ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}`,
      message: `Your booking request for "${booking.propertyId.title}" has been ${statusText}.`,
      relatedId: booking.propertyId._id,
      read: false
    });

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
