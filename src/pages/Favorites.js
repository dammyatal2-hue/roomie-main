import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Button,
  Avatar,
  Chip
} from '@mui/material';
import { Favorite, Delete, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FavoriteCard = styled(Card)({
  marginBottom: '16px',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
});

const PriceText = styled(Typography)({
  color: '#2e7d32',
  fontWeight: 'bold',
});

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFromFavorites = (listingId) => {
    const updatedFavorites = favorites.filter(item => item.id !== listingId);
    setFavorites(updatedFavorites);
    localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('userFavorites');
  };

  // Sample data structure for demonstration
  const sampleFavorites = [
    {
      id: 1,
      title: 'Cozy Studio near Downtown',
      price: 1200,
      location: 'Downtown, City',
      image: '/studio-image.jpg',
      type: 'Studio',
      amenities: ['Parking', 'Laundry', 'Gym'],
      matchScore: 85
    },
    {
      id: 2,
      title: 'Modern 2-Bedroom Apartment',
      price: 1800,
      location: 'North Park',
      image: '/apartment-image.jpg',
      type: '2-Bedroom',
      amenities: ['Pool', 'Balcony', 'Pet Friendly'],
      matchScore: 92
    }
  ];

  // Use sample data if no favorites exist
  const displayFavorites = favorites.length > 0 ? favorites : sampleFavorites;

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          My Favorites
        </Typography>
        {displayFavorites.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={clearAllFavorites}
          >
            Clear All
          </Button>
        )}
      </Box>

      {displayFavorites.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Favorite sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No favorites yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start exploring properties and add them to your favorites!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {displayFavorites.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <FavoriteCard>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={item.image}
                        sx={{ width: 60, height: 60, mr: 2 }}
                        variant="rounded"
                      >
                        {item.title.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h2">
                          {item.title}
                        </Typography>
                        <Box display="flex" alignItems="center" color="text.secondary">
                          <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {item.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => removeFromFavorites(item.id)}
                      aria-label="Remove from favorites"
                    >
                      <Delete />
                    </IconButton>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <PriceText variant="h5">
                      ${item.price}/month
                    </PriceText>
                    <Chip
                      label={`${item.matchScore}% Match`}
                      color={item.matchScore >= 80 ? 'success' : item.matchScore >= 60 ? 'warning' : 'error'}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.type} • {item.amenities?.join(' • ')}
                  </Typography>

                  <Box display="flex" gap={1}>
                    <Button variant="contained" size="small" fullWidth>
                      Contact
                    </Button>
                    <Button variant="outlined" size="small" fullWidth>
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </FavoriteCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          {displayFavorites.length} {displayFavorites.length === 1 ? 'item' : 'items'} in favorites
        </Typography>
      </Box>
    </Box>
  );
}