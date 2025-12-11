import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Card, CardContent, CardMedia, AppBar, Toolbar,
  BottomNavigation, BottomNavigationAction, IconButton, TextField, InputAdornment,
  Grid, Chip, Avatar, Skeleton
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
import { propertyService } from '../services/propertyService';
import { roommateService } from '../services/roommateService';
import UserProfile from '../components/UserProfile';

export default function Home() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(0);
  const [properties, setProperties] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(user);

      const [propertiesData, roommatesData] = await Promise.all([
        propertyService.getAll(),
        user ? roommateService.getPotentialRoommates(user.id) : Promise.resolve([])
      ]);

      setProperties(propertiesData);
      setRoommates(roommatesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (newValue) => {
    setNavValue(newValue);
    const routes = ['/home', '/explore', '/favorites', '/profile'];
    navigate(routes[newValue]);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)', pb: 8 }}>
      <AppBar position="static" elevation={0} sx={{ background: 'white', borderBottom: '1px solid #E0E0E0' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
              Your Location
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
              <LocationOnIcon sx={{ color: '#FF385C', fontSize: 18 }} />
              <Typography variant="body2" fontWeight={600} sx={{ color: '#222' }}>
                {currentUser?.location || 'Kigali, Rwanda'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={() => navigate('/notifications')} sx={{ background: '#F7F7F7' }}>
              <NotificationsIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <UserProfile />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <TextField
          fullWidth
          placeholder="Search properties, roommates..."
          onClick={() => navigate('/search')}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              background: 'white',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: 'none',
              '& fieldset': { border: 'none' }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#999' }} />
              </InputAdornment>
            )
          }}
        />

        <Card sx={{
          background: 'linear-gradient(135deg, #FF385C 0%, #FF6B8B 100%)',
          color: 'white',
          mb: 3,
          borderRadius: '20px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(255,56,92,0.25)'
        }}
          onClick={() => navigate('/roommate-matching')}
        >
          <CardContent sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ letterSpacing: '-0.5px' }}>
              Find Your Perfect Roommate
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, fontSize: '0.95rem' }}>
              Smart matching • Verified profiles • Instant chat
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.25rem', color: '#222' }}>
              Available Properties
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#FF385C', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/explore')}
            >
              View All →
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rectangular" width={240} height={200} sx={{ borderRadius: '16px' }} />
              ))}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
              {properties.slice(0, 5).map((property) => (
                <Card
                  key={property._id}
                  sx={{
                    minWidth: 240,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
                  }}
                  onClick={() => navigate('/property-details', { state: { property } })}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300'}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Chip
                      label={`$${property.price}/${property.priceType}`}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'rgba(0,0,0,0.75)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'white',
                        '&:hover': { background: 'white' }
                      }}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: 20, color: '#FF385C' }} />
                    </IconButton>
                  </Box>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body1" fontWeight={600} noWrap sx={{ mb: 0.5, color: '#222' }}>
                      {property.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 14, color: '#999' }} />
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {property.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={`${property.bedrooms} Beds`} size="small" sx={{ fontSize: '0.7rem' }} />
                      <Chip label={`${property.bathrooms} Baths`} size="small" sx={{ fontSize: '0.7rem' }} />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.25rem', color: '#222' }}>
              Find Roommates
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#FF385C', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/roommate-matching')}
            >
              View All →
            </Typography>
          </Box>

          {loading ? (
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <Grid item xs={6} key={i}>
                  <Skeleton variant="rectangular" height={120} sx={{ borderRadius: '16px' }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {roommates.slice(0, 6).map((roommate) => (
                <Grid item xs={6} key={roommate._id}>
                  <Card
                    sx={{
                      borderRadius: '16px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
                    }}
                    onClick={() => navigate(`/match-profile/${roommate._id}`)}
                  >
                    <CardContent sx={{ p: 2, display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          background: 'linear-gradient(135deg, #FF385C 0%, #FF6B8B 100%)',
                          fontWeight: 700,
                          fontSize: '1.2rem'
                        }}
                      >
                        {roommate.avatar || roommate.name?.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap sx={{ color: '#222' }}>
                          {roommate.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {roommate.location}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                          {roommate.preferences?.cleanliness && (
                            <Chip label="Clean" size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                          )}
                          {!roommate.preferences?.smoking && (
                            <Chip label="No Smoke" size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>

      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #E0E0E0', zIndex: 1000 }}>
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(e, newValue) => handleNavigation(newValue)}
          sx={{ height: 64 }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Card, CardContent, CardMedia, AppBar, Toolbar,
  BottomNavigation, BottomNavigationAction, IconButton, TextField, InputAdornment,
  Grid, Chip, Avatar, Skeleton, Button, Divider, Rating
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
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import { propertyService } from '../services/propertyService';
import { roommateService } from '../services/roommateService';
import UserProfile from '../components/UserProfile';

export default function Home() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(0);
  const [properties, setProperties] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(user);

      const [propertiesData, roommatesData] = await Promise.all([
        propertyService.getAll(),
        user ? roommateService.getPotentialRoommates(user.id) : Promise.resolve([])
      ]);

      setProperties(propertiesData);
      setRoommates(roommatesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (newValue) => {
    setNavValue(newValue);
    const routes = ['/home', '/explore', '/favorites', '/profile'];
    navigate(routes[newValue]);
  };

  const PropertyCard = ({ property, featured = false }) => (
    <Card
      sx={{
        height: '100%',
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0,0,0,0.04)',
        '&:hover': { 
          transform: 'translateY(-8px)', 
          boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.08)'
        }
      }}
      onClick={() => navigate('/property-details', { state: { property } })}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={featured ? "260" : "200"}
          image={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'}
          sx={{ objectFit: 'cover' }}
        />
        {featured && (
          <Chip
            icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
            label="Featured"
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 12px rgba(255,215,0,0.4)'
            }}
          />
        )}
        <Chip
          label={`$${property.price}/${property.priceType}`}
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            background: 'rgba(0,0,0,0.75)',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.95rem',
            letterSpacing: '-0.01em',
            backdropFilter: 'blur(12px)',
            px: 1.5
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            '&:hover': { background: 'white', transform: 'scale(1.1)' }
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 20, color: '#FF385C' }} />
        </IconButton>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1a1a1a', fontSize: '1.125rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          {property.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <LocationOnIcon sx={{ fontSize: 16, color: '#717171' }} />
          <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '-0.01em' }}>
            {property.location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BedIcon sx={{ fontSize: 18, color: '#717171' }} />
            <Typography variant="body2" fontWeight={500} sx={{ letterSpacing: '-0.01em' }}>{property.bedrooms} Beds</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BathtubIcon sx={{ fontSize: 18, color: '#717171' }} />
            <Typography variant="body2" fontWeight={500} sx={{ letterSpacing: '-0.01em' }}>{property.bathrooms} Baths</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={property.rating || 4.5} readOnly size="small" precision={0.5} />
            <Typography variant="body2" fontWeight={600} sx={{ letterSpacing: '-0.01em' }}>
              {property.rating || 4.5}
            </Typography>
          </Box>
          {property.isShared && (
            <Chip label="Shared" size="small" color="primary" sx={{ height: 24, fontWeight: 600 }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );

  const RoommateCard = ({ roommate }) => (
    <Card
      sx={{
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0,0,0,0.04)',
        '&:hover': { 
          transform: 'translateY(-4px)', 
          boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.08)'
        }
      }}
      onClick={() => navigate(`/match-profile/${roommate._id}`)}
    >
      <CardContent sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Avatar
          sx={{
            width: 68,
            height: 68,
            background: 'linear-gradient(135deg, #FF385C 0%, #FF6B8B 100%)',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          {roommate.avatar || roommate.name?.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <Typography variant="body1" fontWeight={700} sx={{ color: '#1a1a1a', letterSpacing: '-0.01em' }}>
              {roommate.name}
            </Typography>
            <VerifiedIcon sx={{ fontSize: 16, color: '#1976d2' }} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, letterSpacing: '-0.01em' }}>
            {roommate.location}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {roommate.preferences?.cleanliness && (
              <Chip label="Clean" size="small" sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }} />
            )}
            {!roommate.preferences?.smoking && (
              <Chip label="No Smoke" size="small" sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }} />
            )}
            {roommate.preferences?.pets && (
              <Chip label="Pet Friendly" size="small" sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }} />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#FAFAFA', pb: 10 }}>
      <AppBar position="sticky" elevation={0} sx={{ background: 'white', borderBottom: '1px solid #E5E7EB' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.02em', textTransform: 'uppercase', fontWeight: 600 }}>
              Location
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
              <LocationOnIcon sx={{ color: '#FF385C', fontSize: 18 }} />
              <Typography variant="body2" fontWeight={600} sx={{ color: '#1a1a1a', letterSpacing: '-0.01em' }}>
                {currentUser?.location || 'Kigali, Rwanda'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={() => navigate('/notifications')} sx={{ background: '#F7F7F7' }}>
              <NotificationsIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <UserProfile />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 1.5, color: '#1a1a1a', letterSpacing: '-0.02em', fontSize: { xs: '2rem', md: '2.75rem' } }}>
            Find Your Perfect Home
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.05rem', letterSpacing: '-0.01em', maxWidth: 600 }}>
            Discover amazing properties and compatible roommates in Kigali
          </Typography>
          <TextField
            fullWidth
            placeholder="Search by location, property type, or price..."
            onClick={() => navigate('/search')}
            sx={{
              maxWidth: 700,
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                background: 'white',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
                '& fieldset': { border: 'none' },
                py: 0.5,
                fontSize: '1rem'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#FF385C', fontSize: 28 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '12px',
                    px: 4,
                    py: 1.2,
                    background: 'linear-gradient(135deg, #FF385C 0%, #FF6B8B 100%)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    boxShadow: '0 4px 12px rgba(255,56,92,0.3)'
                  }}
                  onClick={() => navigate('/search')}
                >
                  Search
                </Button>
              )
            }}
          />
        </Box>

        <Card sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          mb: 6,
          borderRadius: '24px',
          cursor: 'pointer',
          boxShadow: '0 12px 48px rgba(102,126,234,0.25)',
          overflow: 'hidden',
          position: 'relative',
          border: 'none'
        }}
          onClick={() => navigate('/roommate-matching')}
        >
          <CardContent sx={{ py: 6, px: 5, position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" fontWeight={800} gutterBottom sx={{ letterSpacing: '-0.02em', fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              Find Your Perfect Roommate
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95, mb: 4, fontWeight: 500, letterSpacing: '-0.01em', fontSize: '1.125rem' }}>
              Smart matching • Verified profiles • Instant chat • Compatible lifestyles
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'white',
                color: '#667eea',
                fontWeight: 700,
                px: 5,
                py: 1.8,
                borderRadius: '14px',
                letterSpacing: '-0.01em',
                fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                '&:hover': { background: '#f5f5f5', transform: 'translateY(-2px)' }
              }}
            >
              Start Matching Now
            </Button>
          </CardContent>
          <Box sx={{
            position: 'absolute',
            right: -80,
            top: -80,
            width: 400,
            height: 400,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '50%'
          }} />
        </Card>

        <Box sx={{ mb: 7 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#1a1a1a', mb: 0.5, letterSpacing: '-0.02em', fontSize: '1.75rem' }}>
                Featured Properties
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '-0.01em', fontSize: '0.95rem' }}>
                Hand-picked premium listings just for you
              </Typography>
            </Box>
            <Button
              endIcon={<ExploreIcon />}
              sx={{ color: '#FF385C', fontWeight: 700, letterSpacing: '-0.01em' }}
              onClick={() => navigate('/explore')}
            >
              View All
            </Button>
          </Box>
          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3].map((i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rectangular" height={360} sx={{ borderRadius: '20px' }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {properties.slice(0, 3).map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property._id}>
                  <PropertyCard property={property} featured />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Divider sx={{ my: 7 }} />

        <Box sx={{ mb: 7 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#1a1a1a', mb: 0.5, letterSpacing: '-0.02em', fontSize: '1.75rem' }}>
                Available Properties
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '-0.01em', fontSize: '0.95rem' }}>
                {properties.length} properties available in your area
              </Typography>
            </Box>
            <Button
              endIcon={<ExploreIcon />}
              sx={{ color: '#FF385C', fontWeight: 700, letterSpacing: '-0.01em' }}
              onClick={() => navigate('/explore')}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Skeleton variant="rectangular" height={320} sx={{ borderRadius: '20px' }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {properties.map((property) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
                  <PropertyCard property={property} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Divider sx={{ my: 7 }} />

        <Box sx={{ mb: 7 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#1a1a1a', mb: 0.5, letterSpacing: '-0.02em', fontSize: '1.75rem' }}>
                Find Compatible Roommates
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '-0.01em', fontSize: '0.95rem' }}>
                {roommates.length} verified users looking for roommates
              </Typography>
            </Box>
            <Button
              endIcon={<PersonIcon />}
              sx={{ color: '#FF385C', fontWeight: 700, letterSpacing: '-0.01em' }}
              onClick={() => navigate('/roommate-matching')}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rectangular" height={140} sx={{ borderRadius: '20px' }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {roommates.slice(0, 9).map((roommate) => (
                <Grid item xs={12} sm={6} md={4} key={roommate._id}>
                  <RoommateCard roommate={roommate} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight={800} sx={{ color: '#1a1a1a', mb: 4, letterSpacing: '-0.02em', fontSize: '1.75rem' }}>
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #FF385C 0%, #FF6B8B 100%)',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(255,56,92,0.25)',
                  border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 48px rgba(255,56,92,0.35)' }
                }}
                onClick={() => navigate('/list-your-space')}
              >
                <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.01em', mb: 1 }}>List Your Space</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, letterSpacing: '-0.01em' }}>
                  Earn money by renting
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.25)',
                  border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 48px rgba(102,126,234,0.35)' }
                }}
                onClick={() => navigate('/roommate-matching')}
              >
                <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.01em', mb: 1 }}>Find Roommate</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, letterSpacing: '-0.01em' }}>
                  Match with compatible people
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(240,147,251,0.25)',
                  border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 48px rgba(240,147,251,0.35)' }
                }}
                onClick={() => navigate('/favorites')}
              >
                <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.01em', mb: 1 }}>My Favorites</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, letterSpacing: '-0.01em' }}>
                  View saved properties
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(79,172,254,0.25)',
                  border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 48px rgba(79,172,254,0.35)' }
                }}
                onClick={() => navigate('/messages')}
              >
                <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.01em', mb: 1 }}>Messages</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, letterSpacing: '-0.01em' }}>
                  Chat with owners
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #E5E7EB', zIndex: 1000 }}>
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(e, newValue) => handleNavigation(newValue)}
          sx={{ height: 64 }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
