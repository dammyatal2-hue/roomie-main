const express = require('express');
const router = express.Router();
const ChatRequest = require('../models/ChatRequest');
const Notification = require('../models/Notification');

// Send chat request
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    
    const existing = await ChatRequest.findOne({ senderId, receiverId });
    if (existing) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    const chatRequest = await ChatRequest.create({ senderId, receiverId, message });
    
    await Notification.create({
      userId: receiverId,
      type: 'message',
      title: 'New Chat Request',
      message: 'Someone wants to connect with you',
      relatedId: senderId
    });

    const populated = await ChatRequest.findById(chatRequest._id)
      .populate('senderId', 'name avatar')
      .populate('receiverId', 'name avatar');
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get pending requests for user
router.get('/pending/:userId', async (req, res) => {
  try {
    const requests = await ChatRequest.find({
      receiverId: req.params.userId,
      status: 'pending'
    })
      .populate('senderId', 'name avatar email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Accept/Deny request
router.patch('/:id/:action', async (req, res) => {
  try {
    const { id, action } = req.params;
    
    if (!['accepted', 'denied'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action' });
    }

    const request = await ChatRequest.findByIdAndUpdate(
      id,
      { status: action },
      { new: true }
    ).populate('senderId receiverId', 'name avatar');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (action === 'accepted') {
      await Notification.create({
        userId: request.senderId._id,
        type: 'message',
        title: 'Chat Request Accepted',
        message: `${request.receiverId.name} accepted your chat request`,
        relatedId: request.receiverId._id
      });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check if chat is allowed between two users
router.get('/check/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    
    const request = await ChatRequest.findOne({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ]
    });

    res.json({
      allowed: request?.status === 'accepted',
      status: request?.status || 'none',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
