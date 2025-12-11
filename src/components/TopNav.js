import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';

export default function TopNav({ title = 'Roomie', showIcons = true }) {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          sx={{ 
            flexGrow: 1,
            background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/home')}
        >
          {title}
        </Typography>
        
        {showIcons && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={() => navigate('/notifications')}>
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={() => navigate('/messages')}>
              <Badge badgeContent={0} color="error">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={() => navigate('/profile')}>
              <PersonIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
