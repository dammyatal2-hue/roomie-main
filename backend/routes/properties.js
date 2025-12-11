const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('ownerId', 'name email avatar');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('ownerId', 'name email avatar phone')
      .populate('roommates', 'name avatar age occupation');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create property
router.post('/', async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update property
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete property
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get properties by owner
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.params.ownerId });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add roommate to property
router.post('/:id/roommates', async (req, res) => {
  try {
    const { roommateId } = req.body;
    const property = await Property.findById(req.params.id).populate('ownerId');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (!property.roommates.includes(roommateId)) {
      property.roommates.push(roommateId);
      await property.save();

      // Notify property owner
      const Notification = require('../models/Notification');
      const User = require('../models/User');
      const roommate = await User.findById(roommateId);
      
      await Notification.create({
        userId: property.ownerId._id,
        type: 'listing',
        title: 'New Roommate Added',
        message: `${roommate.name} has been added as a roommate to your property: ${property.title}`,
        relatedId: roommateId,
        read: false
      });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
