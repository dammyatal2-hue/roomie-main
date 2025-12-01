import React from 'react';
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
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  Chip,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import UserProfile from '../components/UserProfile';

const apartmentListings = [
  {
    id: 1,
    title: "Green Palm Stay",
    location: "Kibagabaga, Gasabo",
    price: "$100/month",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Kigali comfort Rooms",
    location: "Kicukiro, Center",
    price: "$310/month",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Green Palm Stay",
    location: "Kibagabaga, Gasabo",
    price: "$100/month",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Kigali comfort Rooms",
    location: "Kicukiro, Center",
    price: "$310/month",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop"
  }
];

const roommateListings = [
  {
    id: 1,
    title: "2 Bedroom Shared...",
    location: "kk 234 Nyarutarama",
    price: "$320/month",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=80&fit=crop"
  },
  {
    id: 2,
    title: "1 Bedroom Shared...",
    location: "Gikondo, Kicukiro",
    price: "$50/month",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100&h=80&fit=crop"
  },
  {
    id: 3,
    title: "2 Bedroom Shared...",
    location: "Gikondo, Kicukiro",
    price: "$320/month",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=80&fit=crop"
  },
  {
    id: 4,
    title: "1 Bedroom Shared...",
    location: "Nyarutarama, Nyaru...",
    price: "$50/month",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=80&fit=crop"
  },
  {
    id: 5,
    title: "1 Bedroom Shared...",
    location: "Gikondo, Kicukiro",
    price: "$320/month",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=80&fit=crop"
  },
  {
    id: 6,
    title: "3 Bedroom Shared...",
    location: "Nyarutarama, Nyaru...",
    price: "$230/night",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=80&fit=crop"
  },
  {
    id: 7,
    title: "1 Bedroom Shared...",
    location: "Gikondo, Kicukiro",
    price: "$320/month",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=80&fit=crop"
  },
  {
    id: 8,
    title: "3 Bedroom Shared...",
    location: "Nyarutarama, Nyaru...",
    price: "$230/night",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=100&h=80&fit=crop"
  }
];

const locations = [
  { name: "Kibagabaga", active: false },
  { name: "Kicukiro", active: true },
  { name: "Gikondo", active: false },
  { name: "Nyarutarama", active: false },
  { name: "Kabeza", active: false },
  { name: "Kimihurura", active: false },
  { name: "Remera", active: false },
  { name: "Kanombe", active: false }
];

const popularProperties = [
  {
    id: 1,
    title: "Rose Garden",
    location: "Nyarutarama",
    price: "$120/night",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=100&h=80&fit=crop",
    liked: false
  },
  {
    id: 2,
    title: "Rose Garden",
    location: "Nyarutarama",
    price: "$180/night",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=80&fit=crop",
    liked: false
  },
  {
    id: 3,
    title: "Elizabeth Hotel",
    location: "Kibagabaga",
    price: "$230/night",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100&h=80&fit=crop",
    liked: true
  },
  {
    id: 4,
    title: "Elizabeth",
    location: "Nyarutarama",
    price: "$320/month",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=80&fit=crop",
    liked: true
  },
  {
    id: 5,
    title: "Rose Garden",
    location: "Kibagabaga",
    price: "$120/night",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100&h=80&fit=crop",
    liked: false
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = React.useState(0);

  const handleNavigation = (newValue) => {
    setNavValue(newValue);
    switch (newValue) {
      case 0: navigate('/home'); break;
      case 1: navigate('/explore'); break;
      case 2: navigate('/favorites'); break;
      case 3: navigate('/profile'); break;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa', pb: 8 }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ background: 'white', color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">Location</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon sx={{ color: '#FE456A', fontSize: 16 }} />
              <Typography variant="body1" fontWeight="bold">Kicukiro, Kigali</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={() => navigate('/notifications')}>
              <NotificationsIcon />
            </IconButton>
            <UserProfile />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search Property"
          onClick={() => navigate('/search')}
          sx={{ 
            mb: 3,
            cursor: 'pointer',
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => navigate('/search')}>
                  <TuneIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Cashback Banner */}
        <Card sx={{ 
          background: 'linear-gradient(135deg, #6B46C1 0%, #9333EA 100%)', 
          color: 'white', 
          mb: 3,
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <CardContent sx={{ py: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              GET YOUR 20% CASHBACK
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              *Expired 25 Aug 2022
            </Typography>
          </CardContent>
          <Box sx={{
            position: 'absolute',
            right: -50,
            top: -20,
            width: 200,
            height: 120,
            background: 'url("https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=200&h=120&fit=crop")',
            backgroundSize: 'cover',
            borderRadius: '12px',
            opacity: 0.3
          }} />
        </Card>

        {/* Roommate Matching CTA */}
        <Card sx={{ 
          background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)', 
          color: 'white', 
          mb: 3,
          borderRadius: '16px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/roommate-matching')}
        >
          <CardContent sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🤝 Find Your Perfect Roommate
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              Use our smart matching algorithm to connect with compatible roommates
            </Typography>
          </CardContent>
        </Card>

        {/* Apartment for Rent */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Apartment for Rent
            </Typography>
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/explore')}
            >
              See all
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {apartmentListings.map((apartment) => (
              <Card 
                key={apartment.id} 
                sx={{ 
                  minWidth: 200, 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => navigate('/property-details')}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={apartment.image}
                  alt={apartment.title}
                />
                <Box sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  background: '#FE456A',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {apartment.price}
                </Box>
                <Box sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'white',
                  borderRadius: '50%',
                  p: 0.5
                }}>
                  <FavoriteBorderIcon sx={{ fontSize: 16, color: '#FE456A' }} />
                </Box>
                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    {apartment.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {apartment.location}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Roommates */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Roommates
            </Typography>
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/roommate-matching')}
            >
              See all
            </Typography>
          </Box>
          
          <Grid container spacing={1}>
            {roommateListings.map((roommate) => (
              <Grid item xs={6} key={roommate.id}>
                <Card 
                  sx={{ 
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/property-details')}
                >
                  <CardContent sx={{ p: 1.5, display: 'flex', gap: 1 }}>
                    <Box
                      component="img"
                      src={roommate.image}
                      sx={{ width: 60, height: 60, borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight="bold" noWrap>
                        {roommate.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 10, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {roommate.location}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {roommate.price}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={roommate.rating} readOnly size="small" sx={{ fontSize: '0.75rem' }} />
                        <Typography variant="caption">{roommate.rating}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Top Locations */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Top Locations
            </Typography>
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/explore')}
            >
              See all
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
            {locations.map((location, index) => (
              <Chip
                key={index}
                label={location.name}
                onClick={() => navigate('/explore')}
                sx={{
                  borderRadius: '20px',
                  backgroundColor: location.active ? '#FE456A' : 'white',
                  color: location.active ? 'white' : 'text.primary',
                  fontWeight: location.active ? 'bold' : 'normal',
                  minWidth: 'auto',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: location.active ? '#FE456A' : '#f5f5f5'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Popular for you */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Popular for you
            </Typography>
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/explore')}
            >
              See all
            </Typography>
          </Box>
          
          <Grid container spacing={1}>
            {popularProperties.map((property) => (
              <Grid item xs={6} key={property.id}>
                <Card 
                  sx={{ 
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/property-details')}
                >
                  <CardContent sx={{ p: 1.5, display: 'flex', gap: 1 }}>
                    <Box
                      component="img"
                      src={property.image}
                      sx={{ width: 60, height: 60, borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight="bold" noWrap>
                        {property.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 10, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {property.location}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {property.price}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Rating value={property.rating} readOnly size="small" sx={{ fontSize: '0.75rem' }} />
                          <Typography variant="caption">{property.rating}</Typography>
                        </Box>
                        <IconButton size="small">
                          {property.liked ? 
                            <FavoriteIcon sx={{ fontSize: 16, color: '#FE456A' }} /> :
                            <FavoriteBorderIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          }
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(event, newValue) => handleNavigation(newValue)}
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