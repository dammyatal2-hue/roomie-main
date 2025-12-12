import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from 'react-router-dom';
import { chatRequestService } from '../services/chatRequestService';

export default function MessageButton({ userId, context = 'general', contextId = null, variant = 'contained', fullWidth = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [chatStatus, setChatStatus] = useState(null);

  useEffect(() => {
    checkStatus();
  }, [userId]);

  const checkStatus = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || !userId) return;
      
      const status = await chatRequestService.checkChatAllowed(currentUser._id || currentUser.id, userId);
      setChatStatus(status);
    } catch (error) {
      console.error('Error checking chat status:', error);
    }
  };

  const handleClick = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (chatStatus?.allowed) {
      navigate(`/chat/${userId}`);
    } else if (chatStatus?.status === 'pending') {
      alert('Chat request is pending approval');
    } else {
      setLoading(true);
      try {
        await chatRequestService.sendRequest(
          currentUser._id || currentUser.id,
          userId,
          `Hi! I'd like to connect with you.`,
          context,
          contextId
        );
        alert('Chat request sent!');
        setChatStatus({ ...chatStatus, status: 'pending' });
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to send request');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button
      variant={variant}
      startIcon={loading ? <CircularProgress size={20} /> : <MessageIcon />}
      onClick={handleClick}
      disabled={loading}
      fullWidth={fullWidth}
    >
      {chatStatus?.allowed ? 'Message' : chatStatus?.status === 'pending' ? 'Pending' : 'Send Request'}
    </Button>
  );
}
