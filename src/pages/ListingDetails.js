import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Rating,
  Divider,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  TextField,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BathtubIcon from '@mui/icons-material/Bathtub';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SecurityIcon from '@mui/icons-material/Security';
import PoolIcon from '@mui/icons-material/Pool';
import YardIcon from '@mui/icons-material/Yard';
import BalconyIcon from '@mui/icons-material/Balcony';
import { propertyService } from '../services/propertyService';
import reviewService from '../services/reviewService';
import favoriteService from '../services/favoriteService';
import { formatPriceWithPeriod } from '../utils/currency';
import MessageButton from '../components/MessageButton';
import { getPlaceholderImage } from '../utils/placeholder';

const getAmenityIcon = (amenity) => {
  const icons = {
    'WiFi': <WifiIcon />,
    'AC': <AcUnitIcon />,
    'Parking': <LocalParkingIcon />,
    'Gym': <FitnessCenterIcon />,
    'Security': <SecurityIcon />,
    'Pool': <PoolIcon />,
    'Garden': <YardIcon />,
    'Balcony': <BalconyIcon />,
    'Laundry': <BathtubIcon />
  };
  return icons[amenity] || <WifiIcon />;
};

export default function ListingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageZoomOpen, setImageZoomOpen] = useState(false);

  useEffect(() => {
    loadProperty();
    loadReviews();
    checkFavorite();
  }, [id]);

  const loadProperty = async () => {
    try {
      if (!id) {
        throw new Error('Property ID is missing');
      }
      const data = await propertyService.getById(id);
      setProperty(data);
    } catch (error) {
      console.error('Error loading property:', error);
      console.error('Property ID:', id);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await reviewService.getByProperty(id);
      setReviews(data);
    } catch (error) {
      // Reviews are optional, silently fail
      setReviews([]);
    }
  };

  const checkFavorite = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && (user._id || user.id)) {
        const userId = user._id || user.id;
        const result = await favoriteService.check(userId, id);
        setIsFavorite(result.isFavorite);
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user || (!user._id && !user.id)) {
        alert('Please login to add favorites');
        return;
      }
      
      const userId = user._id || user.id;
      
      if (isFavorite) {
        await favoriteService.remove(userId, id);
      } else {
        await favoriteService.add(userId, id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorite');
    }
  };

  const handleSubmitReview = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user || (!user._id && !user.id)) {
        alert('Please login to submit a review');
        return;
      }

      const userId = user._id || user.id;

      await reviewService.create({
        propertyId: id,
        userId: userId,
        rating: newReview.rating,
        comment: newReview.comment,
        userName: user.name,
        userAvatar: user.avatar
      });

      setReviewDialogOpen(false);
      setNewReview({ rating: 5, comment: '' });
      loadReviews();
      loadProperty();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Property not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Property Details
          </Typography>
          <IconButton color="inherit" onClick={toggleFavorite}>
            {isFavorite ? <FavoriteIcon sx={{ color: '#FE456A' }} /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton color="inherit">
            <ShareIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Property Header */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            {property.title}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
            {formatPriceWithPeriod(property.price, property.priceType || 'month')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body1" color="text.secondary">
              📍 {property.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={property.rating || 4.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {property.rating || 4.5}
            </Typography>
            <Chip 
              label={property.isShared ? 'Shared Space' : 'Private'} 
              color="primary" 
              size="small"
              sx={{ ml: 1 }}
            />
            <Chip 
              label={property.available ? 'Available' : 'Booked'} 
              color={property.available ? 'success' : 'default'}
              size="small"
            />
          </Box>
        </Paper>

        {/* Property Image Gallery with Slider */}
        <Paper elevation={1} sx={{ p: 0, mb: 2, borderRadius: '16px', overflow: 'hidden' }}>
          <Box sx={{ position: 'relative' }}>
            <img
              src={property.images?.[currentImageIndex] || getPlaceholderImage(800, 400)}
              alt={property.title}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                display: 'block',
                cursor: 'zoom-in'
              }}
              onClick={() => setImageZoomOpen(true)}
              onError={(e) => {
                e.target.src = getPlaceholderImage(800, 400);
              }}
            />
            {/* Image indicators */}
            {property.images && property.images.length > 1 && (
              <Box sx={{ 
                position: 'absolute', 
                bottom: 16, 
                left: '50%', 
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1
              }}>
                {property.images.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: currentImageIndex === index ? '#FE456A' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </Box>
            )}
          </Box>
          
          {/* Thumbnail Gallery */}
          {property.images && property.images.length > 1 && (
            <Grid container spacing={1} sx={{ p: 2 }}>
              {property.images.map((img, index) => (
                <Grid item xs={3} key={index}>
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: currentImageIndex === index ? '3px solid #FE456A' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={img}
                      alt={`${property.title} ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/* Property Details */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Property Details
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
              <Typography variant="h6" fontWeight="bold">{property.bedrooms || 1}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
              <Typography variant="h6" fontWeight="bold">{property.bathrooms || 1}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">Type</Typography>
              <Typography variant="h6" fontWeight="bold">{property.type || 'Apartment'}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">Status</Typography>
              <Chip 
                label={property.available ? 'Available Now' : 'Booked'} 
                color={property.available ? 'success' : 'default'}
                size="small"
              />
            </Grid>
          </Grid>

          <Typography variant="body1" paragraph>
            {property.description || 'No description available.'}
          </Typography>
        </Paper>

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Amenities
            </Typography>
            <Grid container spacing={1}>
              {property.amenities.map((amenity, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
                    {getAmenityIcon(amenity)}
                    <Typography variant="body2">{amenity}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Roommates Section */}
        {property.roommates && property.roommates.length > 0 && (
          <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Current Roommates ({property.roommates.length})
            </Typography>
            <Grid container spacing={2}>
              {property.roommates.map((roommate, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={roommate.avatar}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 1,
                        background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)'
                      }}
                    >
                      {roommate.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {roommate.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {roommate.age ? `${roommate.age} years` : 'Age N/A'}
                    </Typography>
                    {roommate.occupation && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        {roommate.occupation}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Owner Information */}
        {property.ownerId && (
          <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Agent
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={property.ownerId.avatar}
                sx={{ 
                  width: 60, 
                  height: 60,
                  background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)'
                }}
              >
                {property.ownerId.name ? property.ownerId.name.charAt(0) : 'O'}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {property.ownerId.name || 'Property Owner'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Real Estate Agent
                </Typography>
              </Box>
              <MessageButton userId={property.ownerId._id} context="property" contextId={id} variant="contained" />
            </Box>
          </Paper>
        )}

        {/* Reviews Section */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Reviews ({reviews.length})
            </Typography>
            <Button variant="outlined" size="small" onClick={() => setReviewDialogOpen(true)}>
              Write Review
            </Button>
          </Box>
          
          {reviews.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No reviews yet. Be the first to review!
            </Typography>
          ) : (
            <Box>
              {reviews.map((review) => (
                <Box key={review._id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar src={review.userAvatar}>{review.userName?.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {review.userName}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body2">{review.comment}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>

        {/* Book Now Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => {
            sessionStorage.setItem('bookingProperty', JSON.stringify(property));
            navigate('/booking', { state: { property } });
          }}
          sx={{ 
            py: 2, 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            '&:hover': {
              background: 'linear-gradient(135deg, #D32F4E 0%, #FE456A 100%)',
            }
          }}
        >
          Book Now
        </Button>
      </Container>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>Rating</Typography>
            <Rating
              value={newReview.rating}
              onChange={(e, value) => setNewReview({ ...newReview, rating: value })}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Share your experience with this property..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitReview}
            disabled={!newReview.comment.trim()}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Zoom Dialog */}
      <Dialog 
        open={imageZoomOpen} 
        onClose={() => setImageZoomOpen(false)} 
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { background: 'rgba(0,0,0,0.9)' }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setImageZoomOpen(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              background: 'rgba(0,0,0,0.5)',
              '&:hover': { background: 'rgba(0,0,0,0.7)' },
              zIndex: 1
            }}
          >
            ✕
          </IconButton>
          <img
            src={property.images?.[currentImageIndex] || getPlaceholderImage(1200, 800)}
            alt={property.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '90vh',
              objectFit: 'contain'
            }}
          />
          {property.images && property.images.length > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : property.images.length - 1))}
                sx={{ background: 'rgba(255,255,255,0.2)' }}
              >
                ← Previous
              </Button>
              <Button
                variant="contained"
                onClick={() => setCurrentImageIndex((prev) => (prev < property.images.length - 1 ? prev + 1 : 0))}
                sx={{ background: 'rgba(255,255,255,0.2)' }}
              >
                Next →
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
