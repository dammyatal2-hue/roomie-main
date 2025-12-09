const express = require('express');
const router = express.Router();

// Mock database
let notifications = [];

// Get notifications by user
router.get('/user/:userId', (req, res) => {
  const userNotifications = notifications.filter(n => n.userId === req.params.userId);
  res.json(userNotifications);
});

// Create notification
router.post('/', (req, res) => {
  const newNotification = {
    id: notifications.length + 1,
    ...req.body,
    read: false,
    createdAt: new Date()
  };
  notifications.push(newNotification);
  res.status(201).json(newNotification);
});

// Mark as read
router.patch('/:id/read', (req, res) => {
  const index = notifications.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Notification not found' });
  }
  notifications[index].read = true;
  res.json(notifications[index]);
});

// Delete notification
router.delete('/:id', (req, res) => {
  notifications = notifications.filter(n => n.id !== parseInt(req.params.id));
  res.json({ message: 'Notification deleted' });
});

module.exports = router;
