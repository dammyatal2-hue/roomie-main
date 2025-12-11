import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Button,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookIcon from '@mui/icons-material/Book';
import api from '../services/api';
import favoriteService from '../services/favoriteService';

// Get current user from localStorage
const getCurrentUser = () => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'JD'
  };
};

export default function Profile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [stats, setStats] = useState({ favorites: 0, listings: 0, messages: 0 });

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('storage', handleStorageChange);
    loadStats();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadStats = async () => {
    try {
      const user = getCurrentUser();
      const userId = user._id || user.id;
      if (!userId) return;

      const [favoritesData, listingsResponse, messagesResponse] = await Promise.all([
        favoriteService.getAll(userId),
        api.get(`/properties/owner/${userId}`),
        api.get(`/messages/user/${userId}`)
      ]);

      const unreadMessages = messagesResponse.data.filter(msg => !msg.read && msg.receiverId === userId);

      setStats({
        favorites: favoritesData.length,
        listings: listingsResponse.data.length,
        messages: unreadMessages.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const menuItems = [
    { icon: <SettingsIcon />, text: 'Settings', action: () => navigate('/settings') },
    { icon: <NotificationsIcon />, text: 'Notification', action: () => navigate('/notifications') },
    { icon: <ListIcon />, text: 'My Listings', action: () => navigate('/my-listing') },
    { icon: <BookIcon />, text: 'Booking Requests', action: () => navigate('/booking-management') },
    { icon: <AddIcon />, text: 'List Your Space', action: () => navigate('/list-your-space') },
    { icon: <FavoriteIcon />, text: 'Favorites', action: () => navigate('/favorites') },
    { icon: <MessageIcon />, text: 'Messages', action: () => navigate('/messages') },
    { icon: <HistoryIcon />, text: 'Recent Viewed', action: () => navigate('/recent') },
    { icon: <InfoIcon />, text: 'About', action: () => navigate('/about') },
    { icon: <LogoutIcon />, text: 'Sign Out', action: () => navigate('/login') },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'center', mr: 6 }}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* User Info Card */}
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: '12px', textAlign: 'center', position: 'relative' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16
            }}
            onClick={() => navigate('/edit-profile')}
          >
            <EditIcon />
          </IconButton>
          <Avatar
            src={currentUser.avatar && !currentUser.avatar.match(/^[A-Z]{1,2}$/) ? currentUser.avatar : undefined}
            sx={{
              width: 80,
              height: 80,
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
          >
            {!currentUser.avatar || currentUser.avatar.match(/^[A-Z]{1,2}$/) ? currentUser.avatar : ''}
          </Avatar>
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            {currentUser.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentUser.email}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {currentUser.location || 'Kigali, Rwanda'}
          </Typography>
        </Paper>

        {/* Quick Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3, textAlign: 'center' }}>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {stats.favorites}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Favorites
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {stats.listings}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Listings
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {stats.messages}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Messages
            </Typography>
          </Box>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper 
                sx={{ 
                  p: 2, 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => navigate('/list-your-space')}
              >
                <AddIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="body2" fontWeight="bold">
                  List Your Space
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper 
                sx={{ 
                  p: 2, 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => navigate('/my-listing')}
              >
                <ApartmentIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="body2" fontWeight="bold">
                  My Listings
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Menu Items */}
        <Paper elevation={1} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => (
              <Box key={item.text}>
                <ListItem 
                  button 
                  onClick={item.action}
                  sx={{ py: 2 }}
                >
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{ 
                      fontWeight: item.text === 'Sign Out' ? 'bold' : 'normal',
                      color: item.text === 'Sign Out' ? 'error.main' : 'text.primary'
                    }}
                  />
                </ListItem>
                {index < menuItems.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>

        {/* Find Roommates CTA */}
        <Paper 
          elevation={1} 
          sx={{ 
            mt: 3, 
            p: 3, 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Find Your Perfect Roommate
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
            Use our smart matching algorithm to find compatible roommates
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              background: 'white', 
              color: '#FE456A',
              fontWeight: 'bold',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)'
              }
            }}
            onClick={() => navigate('/roommate-matching')}
          >
            Start Matching
          </Button>
        </Paper>

        {/* List Your Space CTA */}
        <Paper 
          elevation={1} 
          sx={{ 
            mt: 2, 
            p: 3, 
            borderRadius: '12px',
            background: 'white',
            border: '2px solid',
            borderColor: 'primary.main',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
            💰 Earn Money from Your Space
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            List your extra room or entire apartment and start earning today
          </Typography>
          <Button 
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/list-your-space')}
            sx={{ 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #D32F4E 0%, #FE456A 100%)',
              }
            }}
          >
            List Your Space
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}