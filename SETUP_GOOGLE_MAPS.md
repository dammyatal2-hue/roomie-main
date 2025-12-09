# Google Maps Setup Guide

## What's Been Done:
1. ✅ Installed @react-google-maps/api package
2. ✅ Created PropertyMap component
3. ✅ Updated Property model to include coordinates (lat, lng)
4. ✅ Fixed listing save issue
5. ✅ Added "Listed on" date display in MyListing

## To Enable Google Maps:

### Step 1: Get Google Maps API Key
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create API Key
5. Copy the API key

### Step 2: Add API Key to Environment
Add this to your `.env` file in the root folder:
```
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

### Step 3: Use PropertyMap Component
Import and use in any page:
```javascript
import PropertyMap from '../components/PropertyMap';

// In your component:
<PropertyMap properties={properties} />
```

### Step 4: Add Coordinates When Creating Property
When listing a property, you can add coordinates:
```javascript
const propertyData = {
  ...otherFields,
  coordinates: {
    lat: -1.9441,  // Kigali latitude
    lng: 30.0619   // Kigali longitude
  }
};
```

## Kigali Coordinates Reference:
- Nyarutarama: { lat: -1.9441, lng: 30.0619 }
- Kacyiru: { lat: -1.9536, lng: 30.0894 }
- Kimihurura: { lat: -1.9536, lng: 30.0894 }
- Remera: { lat: -1.9536, lng: 30.1132 }
- Kicukiro: { lat: -1.9667, lng: 30.1000 }

## Features:
- Shows all properties on map with markers
- Markers display property price
- Click marker to see property details
- Auto-centers on selected property
- Zoom controls
- Street view available

## Next Steps:
1. Get Google Maps API key
2. Add to .env file
3. Restart frontend (npm start)
4. Add PropertyMap to Explore or Search page
5. Properties will show on map!
