import React, { useState, useEffect } from 'react';
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
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Avatar
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import UserProfile from '../components/UserProfile';
import propertyService from '../services/propertyService';
import { roommateService } from '../services/roommateService';
import { formatPriceWithPeriod } from '../utils/currency';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BathtubIcon from '@mui/icons-material/Bathtub';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SecurityIcon from '@mui/icons-material/Security';
import PoolIcon from '@mui/icons-material/Pool';
import YardIcon from '@mui/icons-material/Yard';
import BalconyIcon from '@mui/icons-material/Balcony';

// Real apartments in Kigali, Rwanda
const kigaliApartments = [
  {
    id: 1,
    title: "Kigali Heights Luxury Apartment",
    location: "Nyarutarama, Kigali",
    price: "$450/month",
    rating: 4.8,
    type: "Luxury Apartment",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["WiFi", "AC", "Parking", "Gym", "Security", "Pool"],
    description: "Modern luxury apartment in upscale Nyarutarama with stunning city views"
  },
  {
    id: 2,
    title: "Kacyiru Executive Suite",
    location: "Kacyiru, Kigali",
    price: "$320/month",
    rating: 4.5,
    type: "Executive Suite",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "AC", "Security", "Balcony"],
    description: "Spacious executive suite near government offices and restaurants"
  },
  {
    id: 3,
    title: "Kimihurura Garden Apartments",
    location: "Kimihurura, Kigali",
    price: "$380/month",
    rating: 4.7,
    type: "Garden Apartment",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Garden", "Parking", "Balcony"],
    description: "Beautiful garden apartment in peaceful Kimihurura neighborhood"
  },
  {
    id: 4,
    title: "Gisozi Modern Studio",
    location: "Gisozi, Kigali",
    price: "$280/month",
    rating: 4.3,
    type: "Studio",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "AC", "Balcony", "Security"],
    description: "Affordable modern studio with great access to city center"
  },
  {
    id: 5,
    title: "Kicukiro Family Home",
    location: "Kicukiro, Kigali",
    price: "$520/month",
    rating: 4.6,
    type: "Family House",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=200&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Parking", "Garden", "Security"],
    description: "Spacious family home perfect for professionals with children"
  },
  {
    id: 6,
    title: "Remera Shared Apartment",
    location: "Remera, Kigali",
    price: "$180/month",
    rating: 4.2,
    type: "Shared Apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Shared Kitchen", "Laundry"],
    description: "Budget-friendly shared apartment near Amahoro Stadium"
  },
  {
    id: 7,
    title: "Kiyovu Premium Residence",
    location: "Kiyovu, Kigali",
    price: "$600/month",
    rating: 4.9,
    type: "Premium Residence",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300&h=200&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["WiFi", "AC", "Pool", "Gym", "Security"],
    description: "Luxury residence in prestigious Kiyovu neighborhood"
  },
  {
    id: 8,
    title: "Gikondo Cozy Apartment",
    location: "Gikondo, Kigali",
    price: "$250/month",
    rating: 4.4,
    type: "Cozy Apartment",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&h=200&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Balcony", "Security"],
    description: "Cozy and affordable apartment in vibrant Gikondo area"
  },
  {
    id: 9,
    title: "Kibagabaga Modern Flat",
    location: "Kibagabaga, Kigali",
    price: "$350/month",
    rating: 4.5,
    type: "Modern Flat",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=300&h=200&fit=crop",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "AC", "Parking", "Balcony"],
    description: "Newly built modern flat with excellent amenities"
  }
];



// Roommate listings in Kigali
const kigaliRoommates = [
  {
    id: 1,
    name: "James N.",
    age: 28,
    occupation: "Software Engineer",
    budget: "$400/month",
    location: "Nyarutarama, Kigali",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    interests: ["Technology", "Hiking", "Reading", "Coffee"],
    lookingFor: "Professional roommate"
  },
  {
    id: 2,
    name: "Marie U.",
    age: 25,
    occupation: "Teacher",
    budget: "$350/month",
    location: "Kacyiru, Kigali",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop",
    interests: ["Education", "Yoga", "Cooking", "Travel"],
    lookingFor: "Quiet professional"
  },
  {
    id: 3,
    name: "David M.",
    age: 30,
    occupation: "Business Consultant",
    budget: "$500/month",
    location: "Kimihurura, Kigali",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop",
    interests: ["Business", "Golf", "Wine", "Networking"],
    lookingFor: "Executive roommate"
  }
];

const propertyTypes = [
  "Apartment", "Shared Space", "Studio", "House", "Luxury", "Budget"
];

const facilities = [
  "WiFi", "AC", "Parking", "Gym", "Pool", "Security", "Garden"
];

const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case 'WiFi': return <WifiIcon fontSize="small" />;
    case 'AC': return <AcUnitIcon fontSize="small" />;
    case 'Parking': return <LocalParkingIcon fontSize="small" />;
    case 'Gym': return <FitnessCenterIcon fontSize="small" />;
    case 'Security': return <SecurityIcon fontSize="small" />;
    case 'Pool': return <PoolIcon fontSize="small" />;
    case 'Garden': return <YardIcon fontSize="small" />;
    case 'Balcony': return <BalconyIcon fontSize="small" />;
    default: return <WifiIcon fontSize="small" />;
  }
};

export default function Explore() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navValue, setNavValue] = React.useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadData();
    // Set search query if passed from Home page
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(user);
      
      const [propertiesData, roommatesData] = await Promise.all([
        propertyService.getAll(),
        user ? roommateService.getPotentialRoommates(user._id || user.id) : Promise.resolve([])
      ]);
      
      setProperties(propertiesData);
      setRoommates(roommatesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract real neighborhoods from properties
  const getKigaliNeighborhoods = () => {
    const locationCounts = {};
    properties.forEach(property => {
      if (property.location) {
        // Extract neighborhood name (first part before comma)
        const neighborhood = property.location.split(',')[0].trim();
        locationCounts[neighborhood] = (locationCounts[neighborhood] || 0) + 1;
      }
    });
    
    return Object.entries(locationCounts)
      .map(([name, count]) => ({
        name,
        count: `${count} ${count === 1 ? 'property' : 'properties'}`
      }))
      .sort((a, b) => {
        const countA = parseInt(a.count);
        const countB = parseInt(b.count);
        return countB - countA;
      });
  };

  const kigaliNeighborhoods = getKigaliNeighborhoods();

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

  // Filter properties by search, type, facility, and price
  const filteredApartments = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (property.type && property.type.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = !selectedType || 
      (property.type && property.type.toLowerCase().includes(selectedType.toLowerCase()));
    
    const matchesFacility = !selectedFacility || 
      (property.amenities && property.amenities.includes(selectedFacility)) ||
      (property.facilities && property.facilities.includes(selectedFacility));
    
    let matchesPrice = true;
    if (priceRange) {
      const price = property.price;
      if (priceRange === 'under300') matchesPrice = price < 300000;
      else if (priceRange === '300-400') matchesPrice = price >= 300000 && price < 400000;
      else if (priceRange === '400-500') matchesPrice = price >= 400000 && price < 500000;
      else if (priceRange === 'over500') matchesPrice = price >= 500000;
    }
    
    return matchesSearch && matchesType && matchesFacility && matchesPrice;
  });

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: '#f5f5f5',
      pb: 7
    }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="/images/roomie-logo.png"
              alt="Roomie Logo"
              sx={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
            <Typography 
              variant="h6" 
              component="h1" 
              fontWeight="bold" 
              color="primary"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              ROOMIE
            </Typography>
          </Box>
          <UserProfile />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search apartments in Kigali..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              background: 'white'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Kigali Neighborhoods */}
        {kigaliNeighborhoods.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2" fontWeight="bold">
                Kigali Neighborhoods
              </Typography>
              <Typography 
                variant="body2" 
                color="primary" 
                sx={{ cursor: 'pointer' }}
              >
                {kigaliNeighborhoods.length} areas
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {kigaliNeighborhoods.map((neighborhood, index) => (
                <Chip
                  key={index}
                  icon={<PlaceIcon />}
                  label={`${neighborhood.name} • ${neighborhood.count}`}
                  variant="outlined"
                  onClick={() => setSearchQuery(neighborhood.name)}
                  sx={{ 
                    mb: 1,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    '& .MuiChip-label': {
                      padding: '0 8px'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Apartments in Kigali */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2" fontWeight="bold">
              Apartments in Kigali
            </Typography>
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ cursor: 'pointer' }}
            >
              {filteredApartments.length} properties
            </Typography>
          </Box>

          {filteredApartments.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
              <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No properties found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search criteria or browse different neighborhoods
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                {kigaliNeighborhoods.slice(0, 4).map((neighborhood, index) => (
                  <Chip
                    key={index}
                    label={neighborhood.name}
                    variant="outlined"
                    onClick={() => setSearchQuery(neighborhood.name)}
                    sx={{ borderRadius: '8px' }}
                  />
                ))}
              </Box>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredApartments.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                  <Card 
                    sx={{ 
                      borderRadius: '12px',
                      cursor: 'pointer',
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                    onClick={() => {
                      if (property._id) {
                        navigate(`/property-details/${property._id}`);
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: '180px',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px',
                        overflow: 'hidden',
                        bgcolor: '#f0f0f0'
                      }}
                    >
                      <img
                        src={property.images?.[0] || property.image || 'https://via.placeholder.com/400x300'}
                        alt={property.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="h3" fontWeight="bold" sx={{ flex: 1 }}>
                          {property.title}
                        </Typography>
                        <Chip 
                          label={property.type} 
                          size="small" 
                          color="primary" 
                          variant="filled"
                          sx={{ fontSize: '0.7rem', height: '20px' }}
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                        <PlaceIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {property.location}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.8rem' }}>
                        {property.description}
                      </Typography>
                      
                      {/* Amenities */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <Chip
                            key={index}
                            icon={getAmenityIcon(amenity)}
                            label={amenity}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.6rem', height: '20px' }}
                          />
                        ))}
                        {property.amenities.length > 3 && (
                          <Chip
                            label={`+${property.amenities.length - 3}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.6rem', height: '20px' }}
                          />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          {formatPriceWithPeriod(property.price, property.priceType || 'month')}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={property.rating} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                            {property.rating}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          🛏️ {property.bedrooms} bed
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          🛁 {property.bathrooms} bath
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Roommates in Kigali - Real Users */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2" fontWeight="bold">
              Roommates in Kigali
            </Typography>
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/roommate-matching')}
            >
              Find Matches
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {roommates.slice(0, 6).map((roommate) => (
              <Card 
                key={roommate._id} 
                sx={{ 
                  minWidth: 280,
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/match-profile/${roommate._id}`)}
              >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={roommate.avatar}
                    sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}
                  >
                    {roommate.name?.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {roommate.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {roommate.occupation || 'Professional'}
                    </Typography>
                    {roommate.matchScore && (
                      <Chip 
                        label={`${roommate.matchScore}% Match`} 
                        size="small" 
                        color="success"
                        sx={{ mt: 0.5 }}
                      />
                    )}
                  </Box>
                </Box>
                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    📍 {roommate.location || 'Kigali, Rwanda'}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {(roommate.interests || []).slice(0, 3).map((interest, index) => (
                      <Chip 
                        key={index}
                        label={interest}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Box>

                  {roommate.preferences?.maxBudget && (
                    <Typography variant="body2" color="primary" fontWeight="bold">
                      Budget: {formatPriceWithPeriod(roommate.preferences.maxBudget)}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Quick Filters */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Quick Filters
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {propertyTypes.map((type) => (
              <Chip 
                key={type} 
                label={type} 
                variant={selectedType === type ? 'filled' : 'outlined'}
                color={selectedType === type ? 'primary' : 'default'}
                clickable 
                onClick={() => setSelectedType(selectedType === type ? '' : type)}
                sx={{ borderRadius: '8px' }}
              />
            ))}
          </Box>
        </Box>

        {/* Facilities Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Facilities
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {facilities.map((facility) => (
              <Chip 
                key={facility} 
                label={facility} 
                variant={selectedFacility === facility ? 'filled' : 'outlined'}
                color={selectedFacility === facility ? 'primary' : 'default'}
                clickable 
                icon={getAmenityIcon(facility)}
                sx={{ borderRadius: '8px' }}
                onClick={() => setSelectedFacility(selectedFacility === facility ? '' : facility)}
              />
            ))}
          </Box>
        </Box>

        {/* Price Range Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Price Range (RWF)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[
              { label: 'Under 300K', value: 'under300' },
              { label: '300K-400K', value: '300-400' },
              { label: '400K-500K', value: '400-500' },
              { label: 'Over 500K', value: 'over500' }
            ].map((range) => (
              <Chip 
                key={range.value} 
                label={range.label} 
                variant={priceRange === range.value ? 'filled' : 'outlined'}
                color={priceRange === range.value ? 'primary' : 'default'}
                clickable 
                sx={{ borderRadius: '8px' }}
                onClick={() => setPriceRange(priceRange === range.value ? '' : range.value)}
              />
            ))}
          </Box>
        </Box>
      </Container>

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