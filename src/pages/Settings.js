import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  AppBar,
  Toolbar,
  IconButton,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeContext } from '../context/ThemeContext';

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Settings
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Paper elevation={1} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <List sx={{ p: 0 }}>
            <ListItem>
              <ListItemIcon><NotificationsIcon color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Push Notifications" 
                secondary="Get notified about bookings, messages, and match requests" 
              />
              <Switch checked={notifications} onChange={() => setNotifications(!notifications)} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><DarkModeIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Dark Mode" secondary="Switch to dark theme" />
              <Switch checked={darkMode} onChange={toggleDarkMode} />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
}