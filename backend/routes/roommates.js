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

// Get potential roommates with smart matching
router.get('/potential/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const users = await User.find({ _id: { $ne: req.params.userId } })
      .select('-password');
    
    // Calculate match scores based on preferences
    const usersWithScores = users.map(user => {
      let score = 0;
      const userPrefs = user.preferences || {};
      const currentPrefs = currentUser.preferences || {};
      
      // Budget compatibility (20 points)
      if (userPrefs.maxBudget && currentPrefs.maxBudget) {
        const budgetDiff = Math.abs(userPrefs.maxBudget - currentPrefs.maxBudget);
        score += Math.max(0, 20 - (budgetDiff / 50));
      }
      
      // Cleanliness match (15 points)
      if (userPrefs.cleanliness && currentPrefs.cleanliness) {
        const cleanDiff = Math.abs(userPrefs.cleanliness - currentPrefs.cleanliness);
        score += Math.max(0, 15 - (cleanDiff * 3));
      }
      
      // Social level match (15 points)
      if (userPrefs.socialLevel && currentPrefs.socialLevel) {
        const socialDiff = Math.abs(userPrefs.socialLevel - currentPrefs.socialLevel);
        score += Math.max(0, 15 - (socialDiff * 3));
      }
      
      // Smoking compatibility (10 points)
      if (userPrefs.smoking === currentPrefs.smoking) score += 10;
      
      // Pets compatibility (10 points)
      if (userPrefs.pets === currentPrefs.pets || currentPrefs.petsTolerance) score += 10;
      
      // Location match (15 points)
      if (user.location && currentUser.location && 
          user.location.toLowerCase().includes(currentUser.location.toLowerCase())) {
        score += 15;
      }
      
      // Shared interests (15 points)
      const userInterests = user.interests || [];
      const currentInterests = currentUser.interests || [];
      const sharedInterests = userInterests.filter(i => currentInterests.includes(i));
      score += Math.min(15, sharedInterests.length * 3);
      
      return { ...user.toObject(), matchScore: Math.round(score) };
    });
    
    // Sort by match score
    usersWithScores.sort((a, b) => b.matchScore - a.matchScore);
    res.json(usersWithScores);
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
