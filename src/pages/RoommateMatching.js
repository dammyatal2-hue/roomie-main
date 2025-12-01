import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Button,
    Grid,
    CircularProgress,
    Alert,
    Container,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material';
import { LocationOn, Message, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { filterAndSortMatches, getCompatibilityLevel, getMatchDescription } from '../utils/matchingAlgorithm';

const RoommateMatching = () => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = () => {
        setLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            // Get current user from localStorage (from Profile.js)
            const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            
            // Sample potential roommates data
            const potentialRoommates = [
                {
                    id: 2,
                    name: 'Alex Johnson',
                    age: 25,
                    occupation: 'Software Engineer',
                    bio: 'Clean and quiet professional looking for a peaceful living environment.',
                    budget: 1100,
                    cleanliness: 'clean',
                    sleepSchedule: 'normal',
                    smoking: 'no',
                    pets: 'no',
                    image: '/alex.jpg'
                },
                {
                    id: 3,
                    name: 'Sarah Miller',
                    age: 28,
                    occupation: 'Graphic Designer',
                    bio: 'Creative professional who enjoys cooking and occasional movie nights.',
                    budget: 1300,
                    cleanliness: 'very clean',
                    sleepSchedule: 'night owl',
                    smoking: 'no',
                    pets: 'sometimes',
                    image: '/sarah.jpg'
                },
                {
                    id: 4,
                    name: 'Mike Chen',
                    age: 26,
                    occupation: 'Marketing Manager',
                    bio: 'Social and active, loves hiking and trying new restaurants.',
                    budget: 1000,
                    cleanliness: 'medium',
                    sleepSchedule: 'early bird',
                    smoking: 'sometimes',
                    pets: 'yes',
                    image: '/mike.jpg'
                },
                {
                    id: 5,
                    name: 'Emily Davis',
                    age: 24,
                    occupation: 'Teacher',
                    bio: 'Looking for a friendly roommate to share expenses and occasional meals.',
                    budget: 1200,
                    cleanliness: 'clean',
                    sleepSchedule: 'normal',
                    smoking: 'no',
                    pets: 'no',
                    image: '/emily.jpg'
                }
            ];

            setCurrentUser(userProfile);
            
            // Use the matching algorithm
            const matchedProfiles = filterAndSortMatches(potentialRoommates, userProfile);
            setMatches(matchedProfiles);
            setLoading(false);
        }, 1500);
    };

    const handleSendMessage = (roommateId) => {
        alert(`Message sent to roommate ${roommateId}`);
        // Implement actual messaging functionality
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        Finding your perfect roommates...
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                        Roommate Matching
                    </Typography>
                    <Box sx={{ width: 48 }} />
                </Toolbar>
            </AppBar>
            
            <Container maxWidth="lg" sx={{ py: 2 }}>
            <Typography variant="h4" gutterBottom>
                Roommate Matches
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
                Based on your profile preferences, we've found these potential roommates.
            </Typography>

            {matches.length === 0 ? (
                <Alert severity="info">
                    No matches found. Please update your profile to get better matches.
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {matches.map((match) => (
                        <Grid item xs={12} md={6} key={match.id}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Box display="flex" alignItems="center">
                                            <Avatar
                                                src={match.image}
                                                sx={{ width: 60, height: 60, mr: 2 }}
                                            >
                                                {match.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6">
                                                    {match.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {match.age} • {match.occupation}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Chip
                                            label={`${match.matchScore}%`}
                                            color={
                                                match.matchScore >= 80 ? 'success' :
                                                match.matchScore >= 60 ? 'warning' : 'error'
                                            }
                                        />
                                    </Box>

                                    <Typography variant="body2" paragraph>
                                        {match.bio}
                                    </Typography>

                                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                                        <Chip
                                            icon={<LocationOn />}
                                            label={`$${match.budget}/month`}
                                            size="small"
                                            variant="outlined"
                                        />
                                        <Chip
                                            label={`Clean: ${match.cleanliness}`}
                                            size="small"
                                            variant="outlined"
                                        />
                                        <Chip
                                            label={`Sleep: ${match.sleepSchedule}`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>

                                    <Box mb={2}>
                                        <Typography variant="body2" color="primary" fontWeight="bold">
                                            {getCompatibilityLevel(match.matchScore)}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {getMatchDescription(match.matchScore)}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" gap={1}>
                                        <Button 
                                            variant="contained" 
                                            fullWidth
                                            onClick={() => navigate(`/roommate-profile/${match.id}`)}
                                            sx={{
                                                background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #D32F4E 0%, #FE456A 100%)'
                                                }
                                            }}
                                        >
                                            View Profile
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            </Container>
        </Box>
    );
};

export default RoommateMatching;