import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Button,
  CardMedia,
  Chip,
  AppBar,
  Toolbar,
  CircularProgress
} from '@mui/material';
import { Delete, LocationOn, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import favoriteService from '../services/favoriteService';

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
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && (user._id || user.id)) {
        const userId = user._id || user.id;
        const data = await favoriteService.getAll(userId);
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (propertyId) => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      const userId = user._id || user.id;
      await favoriteService.remove(userId, propertyId);
      setFavorites(favorites.filter(item => item.propertyId._id !== propertyId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            My Favorites
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {favorites.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No favorites yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start exploring properties and add them to your favorites!
          </Typography>
          <Button variant="contained" onClick={() => navigate('/explore')}>
            Explore Properties
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((item) => {
            const property = item.propertyId;
            return (
              <Grid item xs={12} md={6} key={item._id}>
                <FavoriteCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.images?.[0] || property.image || 'https://via.placeholder.com/400x300'}
                    alt={property.title}
                  />
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box flex={1}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {property.title}
                        </Typography>
                        <Box display="flex" alignItems="center" color="text.secondary">
                          <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {property.location}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => removeFromFavorites(property._id)}
                        aria-label="Remove from favorites"
                      >
                        <Delete />
                      </IconButton>
                    </Box>

                    <PriceText variant="h5" gutterBottom>
                      ${property.price}/{property.priceType || 'month'}
                    </PriceText>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {property.type} • {property.amenities?.slice(0, 3).join(' • ')}
                    </Typography>

                    <Box display="flex" gap={1}>
                      <Button 
                        variant="contained" 
                        size="small" 
                        fullWidth
                        onClick={() => navigate(`/property-details/${property._id}`)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </FavoriteCard>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} in favorites
        </Typography>
      </Box>
      </Box>
    </Box>
  );
}