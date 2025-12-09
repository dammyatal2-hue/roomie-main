const express = require('express');
const router = express.Router();

// Mock database
let matchRequests = [];

// Get all match requests
router.get('/matches', (req, res) => {
  res.json(matchRequests);
});

// Get match requests by user
router.get('/matches/user/:userId', (req, res) => {
  const userMatches = matchRequests.filter(m => m.toUserId === req.params.userId || m.fromUserId === req.params.userId);
  res.json(userMatches);
});

// Create match request
router.post('/matches', (req, res) => {
  const newMatch = {
    id: matchRequests.length + 1,
    ...req.body,
    status: 'pending',
    createdAt: new Date()
  };
  matchRequests.push(newMatch);
  res.status(201).json(newMatch);
});

// Update match status
router.patch('/matches/:id/status', (req, res) => {
  const index = matchRequests.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Match request not found' });
  }
  matchRequests[index].status = req.body.status;
  res.json(matchRequests[index]);
});

module.exports = router;
