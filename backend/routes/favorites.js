const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// Get all favorites for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId })
      .populate('propertyId')
      .sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check if property is favorited
router.get('/check/:userId/:propertyId', async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      userId: req.params.userId,
      propertyId: req.params.propertyId
    });
    res.json({ isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to favorites
router.post('/', async (req, res) => {
  try {
    const existing = await Favorite.findOne({
      userId: req.body.userId,
      propertyId: req.body.propertyId
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Already in favorites' });
    }
    
    const newFavorite = await Favorite.create(req.body);
    const populated = await Favorite.findById(newFavorite._id).populate('propertyId');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from favorites
router.delete('/:userId/:propertyId', async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      userId: req.params.userId,
      propertyId: req.params.propertyId
    });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update favorite notes
router.patch('/:id/notes', async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndUpdate(
      req.params.id,
      { notes: req.body.notes },
      { new: true }
    ).populate('propertyId');
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
