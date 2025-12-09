const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  phone: String,
  location: String,
  bio: String,
  occupation: String,
  interests: [String],
  preferences: {
    cleanliness: Number,
    socialLevel: Number,
    smoking: Boolean,
    pets: Boolean,
    petsTolerance: Boolean,
    guests: String,
    sleepSchedule: Number,
    workSchedule: String,
    nightOwl: Boolean,
    earlyBird: Boolean,
    maxBudget: Number,
    preferredArea: String,
    roomType: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
