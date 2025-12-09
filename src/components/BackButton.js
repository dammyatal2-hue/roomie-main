import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to = '/home' }) {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate(to)}
      sx={{
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          background: 'white',
          transform: 'translateX(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        },
        transition: 'all 0.2s'
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}
