const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  priceType: { type: String, enum: ['month', 'night'], default: 'month' },
  rating: { type: Number, default: 0 },
  image: String,
  images: [String],
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bedrooms: Number,
  bathrooms: Number,
  isShared: { type: Boolean, default: false },
  description: String,
  amenities: [String],
  available: { type: Boolean, default: true },
  type: String,
  coordinates: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
