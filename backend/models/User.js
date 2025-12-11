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
  preferences: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
