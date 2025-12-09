const express = require('express');
const router = express.Router();

// Mock database
let users = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@email.com',
    avatar: 'JD',
    phone: '+250 123 456 789',
    bio: 'Looking for roommates and properties'
  },
  {
    id: 'user2',
    name: 'Sarah Smith',
    email: 'sarah@email.com',
    avatar: 'SS',
    phone: '+250 987 654 321',
    bio: 'Renting out properties and seeking roommates'
  },
  {
    id: 'user3',
    name: 'Alex Johnson',
    email: 'alex@email.com',
    avatar: 'AJ',
    phone: '+250 555 123 456',
    bio: 'Looking for a place and roommates'
  }
];

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Update user profile
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[index] = { ...users[index], ...req.body };
  const { password, ...userWithoutPassword } = users[index];
  res.json(userWithoutPassword);
});

module.exports = router;
