import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

// Get current user from localStorage or default
const getCurrentUser = () => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'JD'
  };
};

export default function UserProfile() {
  const navigate = useNavigate();
  const [currentUser] = useState(getCurrentUser());

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          fontSize: '0.9rem',
          background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)'
        }}
      >
        {currentUser.avatar}
      </Avatar>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography variant="body2" fontWeight="bold">
          {currentUser.name}
        </Typography>
      </Box>
      <Button
        size="small"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ ml: 1, minWidth: 'auto' }}
      >
        Logout
      </Button>
    </Box>
  );
}