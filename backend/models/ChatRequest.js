const mongoose = require('mongoose');

const chatRequestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'denied'],
    default: 'pending'
  },
  message: {
    type: String,
    default: 'Hi! I would like to connect with you.'
  }
}, {
  timestamps: true
});

chatRequestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

module.exports = mongoose.model('ChatRequest', chatRequestSchema);
