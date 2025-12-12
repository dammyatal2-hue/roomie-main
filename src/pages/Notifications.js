import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookingIcon from '@mui/icons-material/EventNote';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import api from '../services/api';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'booking': return <BookingIcon />;
    case 'message': return <MessageIcon />;
    case 'match': return <FavoriteIcon />;
    case 'listing': return <HomeIcon />;
    default: return <HomeIcon />;
  }
};

const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && (user._id || user.id)) {
        const userId = user._id || user.id;
        const response = await api.get(`/notifications/user/${userId}`);
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        await api.put(`/notifications/${notification._id}/read`);
        loadNotifications();
      }
      
      if (notification.type === 'booking' && notification.relatedId) {
        navigate(`/booking`);
      } else if (notification.type === 'message') {
        if (notification.relatedId) {
          // Navigate to chat with the specific user
          navigate(`/chat/${notification.relatedId}`);
        } else {
          navigate('/messages');
        }
      } else if (notification.type === 'match' && notification.relatedId) {
        navigate(`/match-profile/${notification.relatedId}`);
      }
    } catch (error) {
      console.error('Error handling notification:', error);
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
            Notifications
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {notifications.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
            <Typography variant="h6" gutterBottom>
              No notifications yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You'll see notifications about bookings, messages, and updates here
            </Typography>
          </Paper>
        ) : (
          <Paper elevation={1} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <List sx={{ p: 0 }}>
              {notifications.map((notification, index) => (
                <ListItem 
                  key={notification.id}
                  button
                  onClick={() => handleNotificationClick(notification)}
                  sx={{ 
                    py: 2,
                    backgroundColor: !notification.read ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <ListItemAvatar>
                    <Badge 
                      color="primary" 
                      variant="dot" 
                      invisible={notification.read}
                    >
                      <Avatar 
                        sx={{ 
                          background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
                          color: 'white'
                        }}
                      >
                        {getNotificationIcon(notification.type)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={!notification.read ? 'bold' : 'normal'}
                        >
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getTimeAgo(notification.createdAt)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {notification.message}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Container>
    </Box>
  );
}