import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box } from '@mui/material';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px'
};

const center = {
  lat: -1.9441,
  lng: 30.0619
};

export default function PropertyMap({ properties = [], selectedProperty = null }) {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY';

  return (
    <Box sx={{ borderRadius: '12px', overflow: 'hidden' }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={selectedProperty?.coordinates || center}
          zoom={selectedProperty ? 15 : 12}
        >
          {properties.map((property, index) => (
            property.coordinates && (
              <Marker
                key={property._id || index}
                position={{ lat: property.coordinates.lat, lng: property.coordinates.lng }}
                title={property.title}
                label={`$${property.price}`}
              />
            )
          ))}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}
