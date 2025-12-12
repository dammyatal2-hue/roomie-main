const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

router.post('/fix-blob-urls', async (req, res) => {
  try {
    const properties = await Property.find({
      $or: [
        { image: /^blob:/ },
        { images: { $elemMatch: { $regex: /^blob:/ } } }
      ]
    });

    const placeholder = 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800';
    let fixed = 0;

    for (const property of properties) {
      let updated = false;

      if (property.image && property.image.startsWith('blob:')) {
        property.image = placeholder;
        updated = true;
      }

      if (property.images && property.images.length > 0) {
        property.images = property.images.map(img => 
          img.startsWith('blob:') ? placeholder : img
        );
        updated = true;
      }

      if (updated) {
        await property.save();
        fixed++;
      }
    }

    res.json({ message: `Fixed ${fixed} properties`, total: properties.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
