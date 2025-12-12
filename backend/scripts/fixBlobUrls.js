const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Property = require('../models/Property');

const fixBlobUrls = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI not found in .env');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const properties = await Property.find({
      $or: [
        { image: /^blob:/ },
        { images: { $elemMatch: { $regex: /^blob:/ } } }
      ]
    });

    console.log(`Found ${properties.length} properties with blob URLs`);

    const placeholder = 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800';

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
        console.log(`Fixed: ${property.title}`);
      }
    }

    console.log('✅ Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixBlobUrls();
