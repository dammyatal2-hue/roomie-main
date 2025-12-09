const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  phone: String,
  bio: String,
  preferences: {
    cleanliness: Number,
    smoking: Boolean,
    pets: Boolean,
    nightOwl: Boolean,
    earlyBird: Boolean
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
