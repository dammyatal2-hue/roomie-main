const express = require('express');
const router = express.Router();
const MatchRequest = require('../models/MatchRequest');
const User = require('../models/User');

// Get all match requests
router.get('/matches', async (req, res) => {
  try {
    const matches = await MatchRequest.find()
      .populate('fromUserId', 'name email avatar bio phone')
      .populate('toUserId', 'name email avatar bio phone');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get match requests by user
router.get('/matches/user/:userId', async (req, res) => {
  try {
    const matches = await MatchRequest.find({
      $or: [{ fromUserId: req.params.userId }, { toUserId: req.params.userId }]
    })
      .populate('fromUserId', 'name email avatar bio phone preferences')
      .populate('toUserId', 'name email avatar bio phone preferences');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get potential roommates (all users except current)
router.get('/potential/:userId', async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.userId } })
      .select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create match request
router.post('/matches', async (req, res) => {
  try {
    const newMatch = await MatchRequest.create({ ...req.body, status: 'pending' });
    const populated = await MatchRequest.findById(newMatch._id)
      .populate('fromUserId', 'name email avatar')
      .populate('toUserId', 'name email avatar');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update match status
router.patch('/matches/:id/status', async (req, res) => {
  try {
    const match = await MatchRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, contactRevealed: req.body.status === 'approved' },
      { new: true }
    ).populate('fromUserId toUserId', 'name email avatar phone');
    if (!match) {
      return res.status(404).json({ message: 'Match request not found' });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete match request
router.delete('/matches/:id', async (req, res) => {
  try {
    const match = await MatchRequest.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match request not found' });
    }
    res.json({ message: 'Match request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
