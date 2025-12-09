const express = require('express');
const router = express.Router();

// Mock database
let bookings = [];

// Get all bookings
router.get('/', (req, res) => {
  res.json(bookings);
});

// Get bookings by user
router.get('/user/:userId', (req, res) => {
  const userBookings = bookings.filter(b => b.userId === req.params.userId);
  res.json(userBookings);
});

// Create booking
router.post('/', (req, res) => {
  const newBooking = {
    id: bookings.length + 1,
    ...req.body,
    status: 'pending',
    createdAt: new Date()
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// Update booking status
router.patch('/:id/status', (req, res) => {
  const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  bookings[index].status = req.body.status;
  res.json(bookings[index]);
});

module.exports = router;
