const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Property = require('../models/Property');

// Get reviews for a property
router.get('/property/:propertyId', async (req, res) => {
  try {
    const reviews = await Review.find({ propertyId: req.params.propertyId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    
    // Update property rating
    const reviews = await Review.find({ propertyId: req.body.propertyId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Property.findByIdAndUpdate(req.body.propertyId, { rating: avgRating });
    
    // Create notification for property owner
    const property = await Property.findById(req.body.propertyId);
    if (property && property.ownerId) {
      const Notification = require('../models/Notification');
      await Notification.create({
        userId: property.ownerId,
        type: 'review',
        title: 'New Review',
        message: `${req.body.userName} left a ${req.body.rating}-star review on your property`,
        relatedId: req.body.propertyId,
        read: false
      });
    }
    
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
