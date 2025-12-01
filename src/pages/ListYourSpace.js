import React, { useState } from 'react';
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
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function ListYourSpace() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    type: 'Apartment',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    facilities: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Listing submitted:', formData);
    navigate('/my-listing');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            List Your Space
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Add New Property Listing
          </Typography>
          
          <form onSubmit={handleSubmit}>
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
            >
              <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Add Photo or Video
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click here to upload
              </Typography>
            </Paper>

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
            </Grid>

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
                List Property
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}