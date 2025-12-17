import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Avatar,
  Card,
  CardMedia,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export default function ListYourSpace() {
  const navigate = useNavigate();
  const location = useLocation();
  const editProperty = location.state?.property;
  const isEditMode = !!editProperty;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    type: 'Apartment',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    isShared: false,
    currentRoommates: []
  });
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (editProperty) {
      setFormData({
        title: editProperty.title || '',
        description: editProperty.description || '',
        location: editProperty.location || '',
        price: editProperty.price?.toString() || '',
        type: editProperty.type || 'Apartment',
        bedrooms: editProperty.bedrooms?.toString() || '',
        bathrooms: editProperty.bathrooms?.toString() || '',
        amenities: editProperty.amenities || [],
        isShared: editProperty.isShared || false,
        currentRoommates: []
      });
      if (editProperty.images && editProperty.images.length > 0) {
        const existingImages = editProperty.images.map((url, index) => ({
          preview: url,
          existing: true
        }));
        setImages(existingImages);
      }
    }
  }, [editProperty]);
  const [roommateForm, setRoommateForm] = useState({
    name: '',
    age: '',
    occupation: '',
    bio: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = await Promise.all(
      files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          const img = new Image();
          
          reader.onload = (event) => {
            img.src = event.target.result;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 800;
              const MAX_HEIGHT = 600;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }

              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              
              const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
              resolve({
                file,
                preview: compressedBase64
              });
            };
          };
          reader.readAsDataURL(file);
        });
      })
    );
    setImages(prev => [...prev, ...newImages]);
  };
  
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleRoommateChange = (field, value) => {
    setRoommateForm(prev => ({ ...prev, [field]: value }));
  };
  
  const addRoommate = () => {
    if (roommateForm.name && roommateForm.age) {
      setFormData(prev => ({
        ...prev,
        currentRoommates: [...prev.currentRoommates, { ...roommateForm, id: Date.now() }]
      }));
      setRoommateForm({ name: '', age: '', occupation: '', bio: '' });
    }
  };
  
  const removeRoommate = (id) => {
    setFormData(prev => ({
      ...prev,
      currentRoommates: prev.currentRoommates.filter(r => r.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.location || !formData.price) {
      alert('Please fill in all required fields (Title, Location, Price)');
      return;
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        alert('Please log in to list a property');
        navigate('/login');
        return;
      }

      // Use base64 images or existing URLs (up to 10)
      const imageUrls = images.length > 0 
        ? images.slice(0, 10).map(img => img.existing ? img.preview : img.preview) 
        : ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'];

      const propertyData = {
        title: formData.title,
        description: formData.description || 'No description provided',
        location: formData.location,
        price: parseInt(formData.price.replace(/[^0-9]/g, '')) || 0,
        bedrooms: parseInt(formData.bedrooms) || 1,
        bathrooms: parseInt(formData.bathrooms) || 1,
        amenities: formData.amenities,
        images: imageUrls,
        image: imageUrls[0],
        ownerId: currentUser._id || currentUser.id,
        isShared: formData.isShared || false
      };

      console.log(isEditMode ? 'Updating' : 'Creating', 'property with data:', propertyData);
      
      if (isEditMode) {
        await propertyService.update(editProperty._id, propertyData);
        alert('Property updated successfully!');
      } else {
        await propertyService.create(propertyData);
        alert('Property listed successfully!');
      }
      navigate('/my-listing');
    } catch (error) {
      console.error('Error listing property:', error);
      console.error('Error details:', error.response?.data);
      alert(`Failed to list property: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            {isEditMode ? 'Edit Property' : 'List Your Space'}
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {isEditMode ? 'Edit Property Listing' : 'Add New Property Listing'}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            {/* Photo Upload */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Property Images
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main' }
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Add Photos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click here to upload property images
                  </Typography>
                </Paper>
              </label>
              
              {images.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {images.map((img, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Card sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="120"
                          image={img.preview}
                          alt={`Upload ${index + 1}`}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'white',
                            '&:hover': { bgcolor: 'error.light' }
                          }}
                          onClick={() => removeImage(index)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Property Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Rose Garden Apartments"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    input={<OutlinedInput label="Location" />}
                  >
                    <MenuItem value="Nyarutarama, Kigali">Nyarutarama, Kigali</MenuItem>
                    <MenuItem value="Kacyiru, Kigali">Kacyiru, Kigali</MenuItem>
                    <MenuItem value="Kimihurura, Kigali">Kimihurura, Kigali</MenuItem>
                    <MenuItem value="Kicukiro, Kigali">Kicukiro, Kigali</MenuItem>
                    <MenuItem value="Remera, Kigali">Remera, Kigali</MenuItem>
                    <MenuItem value="Gisozi, Kigali">Gisozi, Kigali</MenuItem>
                    <MenuItem value="Kiyovu, Kigali">Kiyovu, Kigali</MenuItem>
                    <MenuItem value="Gikondo, Kigali">Gikondo, Kigali</MenuItem>
                    <MenuItem value="Kibagabaga, Kigali">Kibagabaga, Kigali</MenuItem>
                    <MenuItem value="Gasabo, Kigali">Gasabo, Kigali</MenuItem>
                    <MenuItem value="Nyarugenge, Kigali">Nyarugenge, Kigali</MenuItem>
                    <MenuItem value="Kanombe, Kigali">Kanombe, Kigali</MenuItem>
                    <MenuItem value="Kinyinya, Kigali">Kinyinya, Kigali</MenuItem>
                    <MenuItem value="Kabeza, Kigali">Kabeza, Kigali</MenuItem>
                    <MenuItem value="Niboye, Kigali">Niboye, Kigali</MenuItem>
                    <MenuItem value="Rugando, Kigali">Rugando, Kigali</MenuItem>
                    <MenuItem value="Nyamirambo, Kigali">Nyamirambo, Kigali</MenuItem>
                    <MenuItem value="Muhima, Kigali">Muhima, Kigali</MenuItem>
                    <MenuItem value="Biryogo, Kigali">Biryogo, Kigali</MenuItem>
                    <MenuItem value="Kimironko, Kigali">Kimironko, Kigali</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="e.g., $320/month"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Property Type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Shared Space">Shared Space</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Amenities</InputLabel>
                  <Select
                    multiple
                    value={formData.amenities}
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
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your property..."
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isShared}
                      onChange={(e) => handleInputChange('isShared', e.target.checked)}
                    />
                  }
                  label="This is a shared space with current roommates"
                />
              </Grid>
            </Grid>
            
            {/* Current Roommates Section */}
            {formData.isShared && (
              <Box sx={{ mt: 3 }}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Current Roommates
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Add profiles of people currently living in this space
                </Typography>
                
                {/* Existing Roommates */}
                {formData.currentRoommates.length > 0 && (
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    {formData.currentRoommates.map((roommate) => (
                      <Grid item xs={12} sm={6} key={roommate.id}>
                        <Paper sx={{ p: 2, borderRadius: '12px' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                              {roommate.name.charAt(0)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" fontWeight="bold">
                                {roommate.name}, {roommate.age}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {roommate.occupation}
                              </Typography>
                              {roommate.bio && (
                                <Typography variant="caption" color="text.secondary">
                                  {roommate.bio}
                                </Typography>
                              )}
                            </Box>
                            <IconButton
                              size="small"
                              onClick={() => removeRoommate(roommate.id)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
                
                {/* Add Roommate Form */}
                <Paper sx={{ p: 2, borderRadius: '12px', bgcolor: '#f5f5f5' }}>
                  <Typography variant="body1" fontWeight="bold" gutterBottom>
                    Add Roommate
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Name"
                        value={roommateForm.name}
                        onChange={(e) => handleRoommateChange('name', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Age"
                        type="number"
                        value={roommateForm.age}
                        onChange={(e) => handleRoommateChange('age', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Occupation"
                        value={roommateForm.occupation}
                        onChange={(e) => handleRoommateChange('occupation', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        label="Short Bio"
                        value={roommateForm.bio}
                        onChange={(e) => handleRoommateChange('bio', e.target.value)}
                        placeholder="Brief description..."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={addRoommate}
                        disabled={!roommateForm.name || !roommateForm.age}
                      >
                        Add Roommate
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate(-1)}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="contained" 
                sx={{ flex: 1 }}
              >
                {isEditMode ? 'Update Property' : 'List Property'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}