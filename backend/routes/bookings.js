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
    const bookingData = { 
      ...req.body, 
      status: 'pending',
      checkIn: new Date(req.body.checkIn),
      checkOut: new Date(req.body.checkOut)
    };
    if (bookingData.guestId && !bookingData.userId) {
      bookingData.userId = bookingData.guestId;
      delete bookingData.guestId;
    }
    const newBooking = await Booking.create(bookingData);
    console.log('Booking created:', newBooking._id);
    
    res.status(201).json(newBooking);
    
    // Do notifications async (don't block response)
    setImmediate(async () => {
      try {
        const property = await Property.findById(req.body.propertyId).populate('ownerId');
        const guest = await User.findById(req.body.userId);
        
        if (property && property.ownerId && guest) {
          const Notification = require('../models/Notification');
          await Notification.create({
            userId: property.ownerId._id,
            type: 'booking',
            title: 'New Booking Request',
            message: `${guest.name} wants to book your property: ${property.title}`,
            relatedId: req.body.userId,
            read: false
          });
        }
      } catch (error) {
        console.error('Async notification error:', error);
      }
    });
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
