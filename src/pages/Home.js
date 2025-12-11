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
import { formatPriceWithPeriod } from '../utils/currency';
import TopNav from '../components/TopNav';

export default function Home() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(0);
  const [properties, setProperties] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)', pt: 8 }}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'white', borderBottom: '1px solid #E0E0E0', zIndex: 1000 }}>
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

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <TextField
          fullWidth
          placeholder="Search properties, roommates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              navigate('/explore', { state: { searchQuery: searchQuery.trim() } });
            }
          }}
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
                <SearchIcon 
                  sx={{ color: '#999', cursor: 'pointer' }}
                  onClick={() => {
                    if (searchQuery.trim()) {
                      navigate('/explore', { state: { searchQuery: searchQuery.trim() } });
                    }
                  }}
                />
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
                      label={formatPriceWithPeriod(property.price, property.priceType || 'month')}
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


    </Box>
  );
}
