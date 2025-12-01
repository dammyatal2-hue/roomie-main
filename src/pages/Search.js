import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Rating,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Chip,
  Slider,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

// Mock search results
const searchResults = [
  {
    id: 1,
    title: "Greenhost Boutique Hotel",
    location: "Kibagabaga, Kigali",
    price: "$120/night",
    rating: 4.5,
    type: "Hotel",
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    title: "Grand Hotel",
    location: "Kibagabaga, Kigali",
    price: "$180/night",
    rating: 4.3,
    type: "Hotel",
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    title: "Jogja Village",
    location: "Kibagabaga, Kigali",
    price: "$90/night",
    rating: 4.7,
    type: "Villa",
    image: "/api/placeholder/300/200"
  },
  {
    id: 4,
    title: "Rose Garden Apartments",
    location: "Kibagabaga, Kigali",
    price: "$320/month",
    rating: 4.5,
    type: "Apartment",
    image: "/api/placeholder/300/200"
  }
];

// Recent searches
const recentSearches = [
  "Rose Garden Kibagabaga, Kigali",
  "Kibagabaga",
  "Kicukiro apartments",
  "Shared rooms Gikondo"
];

// Filter options
const propertyTypes = [
  "Apartment",
  "Penthouse",
  "Hotel",
  "Villa"
];

const facilities = [
  "Bed room",
  "Bathub",
  "AC",
  "WIFI"
];

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('Kibaga');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 800]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [lookingFor, setLookingFor] = useState('For Rent');

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handleResetFilters = () => {
    setPriceRange([10, 800]);
    setSelectedTypes([]);
    setSelectedFacilities([]);
    setLookingFor('For Rent');
  };

  const applyFilters = () => {
    setShowFilters(false);
    // In real app, this would filter the search results
    console.log('Applied filters:', {
      priceRange,
      selectedTypes,
      selectedFacilities,
      lookingFor
    });
  };

  const filteredResults = searchResults.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flex: 1, ml: 1 }}>
            <TextField
              fullWidth
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }
              }}
            />
          </Box>
          <IconButton 
            color="inherit" 
            onClick={() => setShowFilters(true)}
            sx={{ ml: 1 }}
          >
            <FilterListIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Recent Searches */}
        {searchQuery === '' && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {recentSearches.map((search, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                  onClick={() => setSearchQuery(search)}
                >
                  <PlaceIcon color="action" />
                  <Typography variant="body1">
                    {search}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        )}

        {/* Search Results */}
        {searchQuery !== '' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Result
            </Typography>
            
            {filteredResults.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
                <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Search not found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Please enable your location services for more optimal result
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/home')}
                  sx={{ borderRadius: '8px' }}
                >
                  Enable Location
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {filteredResults.map((property) => (
                  <Grid item xs={12} key={property.id}>
                    <Card 
                      sx={{ 
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 3
                        }
                      }}
                      onClick={() => navigate('/property-details')}
                    >
                      <CardContent sx={{ display: 'flex', gap: 2, p: 2 }}>
                        <CardMedia
                          component="img"
                          sx={{ 
                            width: 100,
                            height: 100,
                            borderRadius: '8px'
                          }}
                          image={property.image || "/api/placeholder/300/200"}
                          alt={property.title}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                            {property.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                            <PlaceIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            {property.location}
                          </Typography>
                          <Chip 
                            label={property.type} 
                            size="small" 
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" color="primary" fontWeight="bold">
                              {property.price}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={property.rating} readOnly size="small" />
                              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                                {property.rating}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Container>

      {/* Filters Modal */}
      {showFilters && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'white',
            zIndex: 1300,
            overflowY: 'auto'
          }}
        >
          {/* Filters Header */}
          <AppBar position="sticky" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => setShowFilters(false)}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                Filter
              </Typography>
              <Button 
                color="primary" 
                onClick={handleResetFilters}
                sx={{ textTransform: 'none' }}
              >
                Reset
              </Button>
            </Toolbar>
          </AppBar>

          <Container maxWidth="sm" sx={{ py: 3 }}>
            {/* Looking For */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Looking for
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['For Rent', 'To Share'].map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    variant={lookingFor === option ? 'filled' : 'outlined'}
                    color={lookingFor === option ? 'primary' : 'default'}
                    onClick={() => setLookingFor(option)}
                    sx={{ flex: 1, py: 2 }}
                  />
                ))}
              </Box>
            </Box>

            {/* Property Type */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Property Type
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {propertyTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    variant={selectedTypes.includes(type) ? 'filled' : 'outlined'}
                    color={selectedTypes.includes(type) ? 'primary' : 'default'}
                    onClick={() => handleTypeToggle(type)}
                  />
                ))}
                <Chip
                  label="Show all"
                  variant="outlined"
                  onClick={() => setSelectedTypes([])}
                />
              </Box>
            </Box>

            {/* Price Range */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Price Range
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={10}
                  max={800}
                  sx={{ color: '#667eea' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    ${priceRange[0]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${priceRange[1]}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Facilities */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Facilities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {facilities.map((facility) => (
                  <FormControlLabel
                    key={facility}
                    control={
                      <Checkbox
                        checked={selectedFacilities.includes(facility)}
                        onChange={() => handleFacilityToggle(facility)}
                        color="primary"
                      />
                    }
                    label={facility}
                  />
                ))}
              </Box>
            </Box>

            {/* Apply Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={applyFilters}
              sx={{
                py: 2,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              Apply
            </Button>
          </Container>
        </Box>
      )}
    </Box>
  );
}