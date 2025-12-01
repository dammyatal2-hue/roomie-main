import React, { useState, useContext, createContext } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Profile Context
const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};

// Available profiles
const profiles = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    type: 'Tenant',
    avatar: 'JD'
  },
  {
    id: 'user2', 
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    type: 'Property Owner',
    avatar: 'SJ'
  },
  {
    id: 'user3',
    name: 'Alex Chen',
    email: 'alex.chen@email.com', 
    type: 'Roommate Seeker',
    avatar: 'AC'
  }
];

export const ProfileProvider = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);

  const switchProfile = (profileId) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setCurrentProfile(profile);
      localStorage.setItem('currentProfile', JSON.stringify(profile));
    }
  };

  return (
    <ProfileContext.Provider value={{ currentProfile, switchProfile, profiles }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default function ProfileSwitcher() {
  const { currentProfile, switchProfile, profiles } = useProfile();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileSwitch = (profileId) => {
    switchProfile(profileId);
    handleClose();
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        startIcon={<SwapHorizIcon />}
        sx={{
          borderRadius: '8px',
          textTransform: 'none',
          color: 'text.primary'
        }}
      >
        <Avatar
          sx={{
            width: 24,
            height: 24,
            fontSize: '0.8rem',
            mr: 1,
            background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)'
          }}
        >
          {currentProfile.avatar}
        </Avatar>
        {currentProfile.name}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { minWidth: 200, borderRadius: '12px' }
        }}
      >
        <Typography variant="body2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
          Switch Profile
        </Typography>
        <Divider />
        
        {profiles.map((profile) => (
          <MenuItem
            key={profile.id}
            onClick={() => handleProfileSwitch(profile.id)}
            selected={profile.id === currentProfile.id}
            sx={{ py: 1.5 }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.9rem',
                mr: 2,
                background: profile.id === currentProfile.id 
                  ? 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)'
                  : 'linear-gradient(135deg, #ccc 0%, #999 100%)'
              }}
            >
              {profile.avatar}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {profile.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {profile.type}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}