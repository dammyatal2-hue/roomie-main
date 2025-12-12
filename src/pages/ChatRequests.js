import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Paper, List, ListItem, ListItemAvatar,
  ListItemText, Avatar, AppBar, Toolbar, IconButton, Button, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { chatRequestService } from '../services/chatRequestService';
import BottomNavBar from '../components/BottomNavBar';

export default function ChatRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) return;
      
      const data = await chatRequestService.getPendingRequests(currentUser._id || currentUser.id);
      setRequests(data);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await chatRequestService.acceptRequest(requestId);
      setRequests(requests.filter(r => r._id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDeny = async (requestId) => {
    try {
      await chatRequestService.denyRequest(requestId);
      setRequests(requests.filter(r => r._id !== requestId));
    } catch (error) {
      console.error('Error denying request:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5', pb: 8 }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Chat Requests
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {requests.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '12px' }}>
            <Typography variant="h6" gutterBottom>No Pending Requests</Typography>
            <Typography variant="body2" color="text.secondary">
              You don't have any chat requests at the moment
            </Typography>
          </Paper>
        ) : (
          <Paper elevation={1} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <List sx={{ p: 0 }}>
              {requests.map((request) => (
                <ListItem key={request._id} sx={{ py: 2, flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                        {request.senderId.avatar || request.senderId.name?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={request.senderId.name}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {request.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckIcon />}
                      onClick={() => handleAccept(request._id)}
                      fullWidth
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CloseIcon />}
                      onClick={() => handleDeny(request._id)}
                      fullWidth
                    >
                      Deny
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Container>
      <BottomNavBar />
    </Box>
  );
}
