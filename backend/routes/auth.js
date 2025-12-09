const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock database
let users = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@email.com',
    password: '$2a$10$XqZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9',
    avatar: 'JD'
  },
  {
    id: 'user2',
    name: 'Sarah Smith',
    email: 'sarah@email.com',
    password: '$2a$10$XqZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9',
    avatar: 'SS'
  },
  {
    id: 'user3',
    name: 'Alex Johnson',
    email: 'alex@email.com',
    password: '$2a$10$XqZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9',
    avatar: 'AJ'
  }
];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: `user${users.length + 1}`,
      name,
      email,
      password: hashedPassword,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    users.push(newUser);

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // For demo purposes, accept any password
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
