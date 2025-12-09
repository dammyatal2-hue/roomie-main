const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get conversation between two users
router.get('/conversation/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ]
    })
      .populate('senderId', 'name avatar')
      .populate('receiverId', 'name avatar')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all conversations for a user
router.get('/conversations/:userId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }]
    })
      .populate('senderId', 'name avatar')
      .populate('receiverId', 'name avatar')
      .sort({ createdAt: -1 });
    
    const conversations = {};
    messages.forEach(msg => {
      const otherUserId = msg.senderId._id.toString() === req.params.userId 
        ? msg.receiverId._id.toString() 
        : msg.senderId._id.toString();
      
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user: msg.senderId._id.toString() === req.params.userId ? msg.receiverId : msg.senderId,
          lastMessage: msg,
          unreadCount: 0
        };
      }
      
      if (!msg.read && msg.receiverId._id.toString() === req.params.userId) {
        conversations[otherUserId].unreadCount++;
      }
    });
    
    res.json(Object.values(conversations));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send message
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const conversationId = [senderId, receiverId].sort().join('_');
    
    const newMessage = await Message.create({
      ...req.body,
      conversationId,
      read: false
    });
    
    const populated = await Message.findById(newMessage._id)
      .populate('senderId', 'name avatar')
      .populate('receiverId', 'name avatar');
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true, readAt: new Date() },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark all messages in conversation as read
router.patch('/conversation/:conversationId/read', async (req, res) => {
  try {
    await Message.updateMany(
      { conversationId: req.params.conversationId, read: false },
      { read: true, readAt: new Date() }
    );
    res.json({ message: 'All messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
