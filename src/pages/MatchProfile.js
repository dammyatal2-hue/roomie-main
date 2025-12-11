import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Chip,
  Slider,
  FormControlLabel,
  Switch,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PetsIcon from '@mui/icons-material/Pets';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ScheduleIcon from '@mui/icons-material/Schedule';
import api from '../services/api';
import { formatPriceWithPeriod } from '../utils/currency';
import LifestyleDisplay from '../components/LifestyleDisplay';

const sampleMatchData = {
  id: 'sarah-johnson-456',
  name: 'Sarah Johnson',
  username: 'Sarah',
  email: 'sarah.johnson@email.com',
  dateOfBirth: '1999-03-15',
  occupation: 'Marketing Specialist',
  bio: 'Clean, organized professional looking for a compatible roommate. I enjoy cooking, reading, and weekend hiking. Non-smoker, no pets, but pet-friendly.',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  
  // Lifestyle preferences
  cleanliness: 4,
  socialLevel: 3,
  smoking: false,
  pets: false,
  petsTolerance: true,
  guests: 'occasional',
  
  // Schedule preferences
  sleepSchedule: 2,
  workSchedule: '9-5',
  dayPreference: 'morning',
  weekendSchedule: 'mixed',
  
  // Roommate preferences
  interests: ['Cooking', 'Reading', 'Hiking', 'Movies', 'Yoga', 'Travel'],
  maxBudget: 400,
  preferredArea: 'Kibagabaga',
  secondaryArea: 'Kicukiro',
  leaseDuration: 12,
  roomType: 'private',
  moveInDate: '2024-12-01',
  
  // Contact (hidden until approved)
  phone: '+250 788 123 456'
};

export default function MatchProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchSent, setMatchSent] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      const { data } = await api.get(`/users/${userId}`);
      setMatchData(data);
    } catch (error) {
      console.error('Error loading user:', error);
      setMatchData(sampleMatchData);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getSliderLabel = (value, type) => {
    const labels = {
      cleanliness: { 1: 'Relaxed', 3: 'Balanced', 5: 'Very Clean' },
      socialLevel: { 1: 'Quiet', 3: 'Balanced', 5: 'Very Social' },
      sleepSchedule: { 1: 'Early', 3: 'Balanced', 5: 'Late' }
    };
    return labels[type][value] || 'Balanced';
  };

  const handleSendMatch = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const fromUserId = currentUser._id || currentUser.id;

      await api.post('/roommates/matches', {
        fromUserId,
        toUserId: userId,
        message: `Hi! I'd like to connect as potential roommates.`
      });

      // Send notification to the profile owner
      await api.post('/notifications', {
        userId: userId,
        type: 'match',
        title: 'New Match Request',
        message: `${currentUser.name} wants to match with you as a roommate!`,
        relatedId: fromUserId,
        read: false
      });

      setMatchSent(true);
      alert(`Match request sent to ${matchData.name}!`);
    } catch (error) {
      console.error('Error sending match:', error);
      alert('Failed to send match request');
    }
  };



  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!matchData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>User not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, fontWeight: 'bold' }}>
            Roommate Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* Profile Photo Section */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px', textAlign: 'center' }}>
          <Avatar
            src={matchData.avatar}
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto 16px',
              border: '4px solid white',
              boxShadow: 2
            }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {matchData.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {matchData.occupation || 'Professional'}
          </Typography>
          {matchData.matchScore && (
            <Chip 
              label={`${matchData.matchScore}% Match`} 
              color="success"
              sx={{ mt: 1 }}
            />
          )}
        </Paper>

        {/* Basic Information */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Username</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {matchData.username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Location</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {matchData.location || 'Kigali, Rwanda'}
              </Typography>
            </Grid>
            {matchData.preferences?.maxBudget && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="bold">Budget</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {formatPriceWithPeriod(matchData.preferences.maxBudget)}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">Occupation</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {matchData.occupation || 'Not specified'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="bold">Bio</Typography>
              <Typography variant="body2" color="text.secondary">
                {matchData.bio}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Lifestyle Preferences */}
        {matchData.preferences && <LifestyleDisplay preferences={matchData.preferences} />}

        {/* Interests */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Interests & Hobbies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(matchData.interests || []).map((interest, idx) => (
              <Chip key={idx} label={interest} size="small" />
            ))}
          </Box>
        </Paper>

        {/* Match Button */}
        {matchSent ? (
          <Paper elevation={1} sx={{ p: 3, borderRadius: '12px', textAlign: 'center', bgcolor: 'success.light' }}>
            <Typography variant="h6" fontWeight="bold" color="success.dark" gutterBottom>
              Match Request Sent! ✅
            </Typography>
            <Typography variant="body2" color="success.dark">
              {matchData.name} will be notified and can accept or decline your request.
            </Typography>
          </Paper>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<FavoriteIcon />}
            onClick={handleSendMatch}
            sx={{ 
              py: 2,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            Send Match Request
          </Button>
        )}
      </Container>
    </Box>
  );
}