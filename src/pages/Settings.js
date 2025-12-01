import React, { useState } from 'react';
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
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    location: true,
    autoBackup: true
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

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
              <ListItemText primary="Push Notifications" secondary="Receive notifications about bookings" />
              <Switch checked={settings.notifications} onChange={() => handleToggle('notifications')} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><DarkModeIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Dark Mode" secondary="Switch to dark theme" />
              <Switch checked={settings.darkMode} onChange={() => handleToggle('darkMode')} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><SecurityIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Location Services" secondary="Allow location access for better matches" />
              <Switch checked={settings.location} onChange={() => handleToggle('location')} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><LanguageIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Auto Backup" secondary="Automatically backup your data" />
              <Switch checked={settings.autoBackup} onChange={() => handleToggle('autoBackup')} />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
}