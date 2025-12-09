const express = require('express');
const router = express.Router();

// Mock database
let properties = [
  {
    id: 1,
    title: "Rose Garden",
    location: "Nyarutarama, Kigali",
    price: 340,
    priceType: "month",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
    ownerId: "user2",
    bedrooms: 2,
    bathrooms: 1,
    isShared: false
  }
];

// Get all properties
router.get('/', (req, res) => {
  res.json(properties);
});

// Get property by ID
router.get('/:id', (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id));
  if (!property) {
    return res.status(404).json({ message: 'Property not found' });
  }
  res.json(property);
});

// Create property
router.post('/', (req, res) => {
  const newProperty = {
    id: properties.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// Update property
router.put('/:id', (req, res) => {
  const index = properties.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Property not found' });
  }
  properties[index] = { ...properties[index], ...req.body };
  res.json(properties[index]);
});

// Delete property
router.delete('/:id', (req, res) => {
  properties = properties.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'Property deleted' });
});

module.exports = router;
