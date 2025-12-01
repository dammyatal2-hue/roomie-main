import React from 'react';
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
import PaymentIcon from '@mui/icons-material/Payment';
import HomeIcon from '@mui/icons-material/Home';

import FavoriteIcon from '@mui/icons-material/Favorite';

const notifications = [
  {
    id: 1,
    type: 'room_application',
    title: 'New Room Application',
    message: 'Alex Chen wants to join your shared apartment in Remera',
    time: '3 min ago',
    unread: true,
    icon: <HomeIcon />,
    userId: 'alex-chen-789'
  },
  {
    id: 2,
    type: 'match',
    title: 'New Match Request',
    message: 'Sarah Johnson wants to match with you as a roommate',
    time: '5 min ago',
    unread: true,
    icon: <FavoriteIcon />,
    userId: 'sarah-johnson-456'
  },
  {
    id: 3,
    type: 'booking',
    title: 'New Booking Request',
    message: 'John Doe wants to book your Kigali Heights apartment',
    time: '2 min ago',
    unread: true,
    icon: <BookingIcon />,
    userId: 'john-doe-123'
  },
  {
    id: 4,
    type: 'message',
    title: 'New Message',
    message: 'Sarah Miller sent you a message about the shared room',
    time: '1 hour ago',
    unread: true,
    icon: <MessageIcon />
  },
  {
    id: 5,
    type: 'listing',
    title: 'Listing Approved',
    message: 'Your Kacyiru Studio listing has been approved and is now live',
    time: '1 day ago',
    unread: false,
    icon: <HomeIcon />
  }
];

export default function Notifications() {
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    if (notification.type === 'booking' && notification.userId) {
      navigate(`/user-profile/${notification.userId}`);
    } else if (notification.type === 'match' && notification.userId) {
      navigate(`/match-profile/${notification.userId}`);
    } else if (notification.type === 'room_application' && notification.userId) {
      navigate(`/user-profile/${notification.userId}`);
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
                    backgroundColor: notification.unread ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                    cursor: (notification.type === 'booking' || notification.type === 'match' || notification.type === 'room_application') && notification.userId ? 'pointer' : 'default'
                  }}
                >
                  <ListItemAvatar>
                    <Badge 
                      color="primary" 
                      variant="dot" 
                      invisible={!notification.unread}
                    >
                      <Avatar 
                        sx={{ 
                          background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
                          color: 'white'
                        }}
                      >
                        {notification.icon}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={notification.unread ? 'bold' : 'normal'}
                        >
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
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