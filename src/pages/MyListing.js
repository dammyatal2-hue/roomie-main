import React, { useState, useEffect } from 'react';
import { propertyService } from '../services/propertyService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function MyListing() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = React.useState(3); // Profile is active
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        const userId = currentUser._id || currentUser.id;
        const data = await propertyService.getByOwner(userId);
        setListings(data);
      }
    } catch (error) {
      console.error('Error loading listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    type: 'Apartment',
    bedrooms: '',
    bathrooms: '',
    image: '',
    amenities: [],
    facilities: [],
    currentRoommates: ''
  });

  const handleNavigation = (newValue) => {
    setNavValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/explore');
        break;
      case 2:
        navigate('/favorites');
        break;
      case 3:
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  const handleAddListing = () => {
    if (newListing.title && newListing.location && newListing.price) {
      const listing = {
        id: listings.length + 1,
        title: newListing.title,
        location: newListing.location,
        period: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' - ' + 
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        status: "Active",
        price: newListing.price,
        image: newListing.image || "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=300&h=200&fit=crop",
        type: newListing.type,
        bedrooms: newListing.bedrooms,
        bathrooms: newListing.bathrooms
      };
      
      setListings(prev => [listing, ...prev]);
      setNewListing({
        title: '',
        description: '',
        location: '',
        price: '',
        type: 'Apartment',
        bedrooms: '',
        bathrooms: '',
        image: '',
        amenities: [],
        facilities: [],
        currentRoommates: ''
      });
      setAddDialogOpen(false);
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await propertyService.delete(listingId);
        setListings(prev => prev.filter(listing => listing._id !== listingId));
        alert('Listing deleted successfully');
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Failed to delete listing');
      }
    }
  };

  const handleInputChange = (field, value) => {
    setNewListing(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: '#f5f5f5',
      pb: 7 // Space for bottom navigation
    }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" fontWeight="bold" sx={{ flexGrow: 1 }}>
            My Listings
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            My Listing
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your property listings
          </Typography>
        </Box>

        {/* Listings Grid */}
        {loading ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
            <Typography>Loading...</Typography>
          </Paper>
        ) : listings.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
            <AddIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No listings yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by adding your first property listing
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => navigate('/list-your-space')}
              sx={{ borderRadius: '8px' }}
            >
              Add Listing
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {listings.map((listing) => (
              <Grid item xs={12} key={listing._id}>
                <Card 
                  sx={{ 
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                  onClick={() => navigate(`/property-details/${listing._id}`)}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex' }}>
                      {/* Property Image */}
                      <CardMedia
                        component="img"
                        sx={{ 
                          width: 120,
                          height: 120,
                          borderTopLeftRadius: '12px',
                          borderBottomLeftRadius: '12px'
                        }}
                        image={listing.images && listing.images[0] ? listing.images[0] : 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=300&h=200&fit=crop'}
                        alt={listing.title}
                      />
                      
                      {/* Property Details */}
                      <Box sx={{ flex: 1, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" component="h3" fontWeight="bold">
                            {listing.title}
                          </Typography>
                          <Chip 
                            label={listing.available ? 'Active' : 'Booked'} 
                            color={listing.available ? 'success' : 'primary'}
                            size="small"
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          📍 {listing.location}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          🗓️ Listed on {new Date(listing.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Chip 
                            label={listing.type} 
                            variant="outlined" 
                            size="small" 
                          />
                          <Chip 
                            label={`${listing.bedrooms} Bed`} 
                            variant="outlined" 
                            size="small" 
                          />
                          <Chip 
                            label={`${listing.bathrooms} Bath`} 
                            variant="outlined" 
                            size="small" 
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            ${listing.price}/month
                          </Typography>
                          <CardActions sx={{ p: 0 }}>
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/list-your-space', { state: { property: listing } });
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteListing(listing._id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Add Listing Dialog */}
      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              Add New Listing
            </Typography>
            <IconButton onClick={() => setAddDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {/* Photo Upload */}
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: '12px',
              mb: 3,
              cursor: 'pointer'
            }}
            onClick={() => {/* Handle file upload */}}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Add Photo or Video
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click here to upload
            </Typography>
          </Paper>

          {/* Form Fields */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Title"
                value={newListing.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Rose Garden Apartments"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={newListing.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Kibagabaga, Kigali"
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                value={newListing.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="e.g., $320/month"
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Property Type"
                value={newListing.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Apartment">Apartment</option>
                <option value="Shared Space">Shared Space</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Hotel">Hotel</option>
              </TextField>
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bedrooms"
                type="number"
                value={newListing.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bathrooms"
                type="number"
                value={newListing.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={newListing.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your property..."
                helperText="350 characters remaining"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Amenities</InputLabel>
                <Select
                  multiple
                  value={newListing.amenities}
                  onChange={(e) => handleInputChange('amenities', e.target.value)}
                  input={<OutlinedInput label="Amenities" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {['WiFi', 'AC', 'Parking', 'Pool', 'Gym', 'Security', 'Garden', 'Balcony', 'Laundry', 'Furnished'].map((amenity) => (
                    <MenuItem key={amenity} value={amenity}>
                      {amenity}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Nearby Facilities</InputLabel>
                <Select
                  multiple
                  value={newListing.facilities}
                  onChange={(e) => handleInputChange('facilities', e.target.value)}
                  input={<OutlinedInput label="Nearby Facilities" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {['Hospital - 2km', 'Shopping Mall - 1km', 'School - 500m', 'Bank - 800m', 'Restaurant - 300m', 'Gym - 1km', 'Park - 800m', 'Bus Station - 500m', 'Market - 600m', 'University - 2km'].map((facility) => (
                    <MenuItem key={facility} value={facility}>
                      {facility}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Roommates (if shared)"
                value={newListing.currentRoommates}
                onChange={(e) => handleInputChange('currentRoommates', e.target.value)}
                placeholder="e.g., 2 professionals, ages 25-30"
                helperText="Leave empty if not a shared space"
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setAddDialogOpen(false)}
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddListing}
            disabled={!newListing.title || !newListing.location || !newListing.price}
            sx={{ borderRadius: '8px' }}
          >
            Add Listing
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(event, newValue) => {
            handleNavigation(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction label="Favorite" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}