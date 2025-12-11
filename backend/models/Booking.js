const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  specialNeeds: String,
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
  ownerResponse: String,
  totalAmount: Number
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
