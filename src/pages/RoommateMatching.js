import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    IconButton,
    CircularProgress,
    Container,
    AppBar,
    Toolbar
} from '@mui/material';
import { LocationOn, ArrowBack, Close, Favorite, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { roommateService } from '../services/roommateService';
import { formatPriceWithPeriod } from '../utils/currency';

const RoommateMatching = () => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState(null);

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (!user || (!user._id && !user.id)) {
                setLoading(false);
                return;
            }
            
            const userId = user._id || user.id;
            setCurrentUser(user);
            
            // Load real users from database with match scores
            const potentialRoommates = await roommateService.getPotentialRoommates(userId);
            setMatches(potentialRoommates);
        } catch (error) {
            console.error('Error loading matches:', error);
            setMatches([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSwipe = async (direction) => {
        if (currentIndex >= matches.length) return;
        
        setSwipeDirection(direction);
        
        if (direction === 'right') {
            // Send match request
            try {
                const match = matches[currentIndex];
                await roommateService.sendMatchRequest(currentUser._id || currentUser.id, match._id);
            } catch (error) {
                console.error('Error sending match:', error);
            }
        }
        
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setSwipeDirection(null);
        }, 300);
    };

    const currentMatch = matches[currentIndex];

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
            
            <Container maxWidth="sm" sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
                {currentIndex >= matches.length ? (
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <Typography variant="h5" gutterBottom>🎉 No more matches!</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Check back later for new potential roommates
                        </Typography>
                    </Box>
                ) : currentMatch ? (
                    <Box sx={{ width: '100%', maxWidth: 400, position: 'relative' }}>
                        <Card 
                            sx={{ 
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                transform: swipeDirection === 'left' ? 'translateX(-400px) rotate(-20deg)' : 
                                          swipeDirection === 'right' ? 'translateX(400px) rotate(20deg)' : 'none',
                                transition: 'transform 0.3s ease',
                                opacity: swipeDirection ? 0 : 1
                            }}
                        >
                            <Box sx={{ position: 'relative', height: 400, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <Avatar
                                    src={currentMatch.avatar}
                                    sx={{ 
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 0,
                                        fontSize: '8rem'
                                    }}
                                >
                                    {currentMatch.name?.charAt(0)}
                                </Avatar>
                                {currentMatch.matchScore && (
                                    <Chip
                                        label={`${currentMatch.matchScore}% Match`}
                                        color="success"
                                        sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 'bold' }}
                                    />
                                )}
                            </Box>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h4" fontWeight="bold" gutterBottom>
                                    {currentMatch.name}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    {currentMatch.occupation || 'Professional'}
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <LocationOn fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {currentMatch.location || 'Kigali, Rwanda'}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    {currentMatch.bio || 'No bio available'}
                                </Typography>
                                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                                    {currentMatch.preferences?.maxBudget && (
                                        <Chip label={formatPriceWithPeriod(currentMatch.preferences.maxBudget)} size="small" />
                                    )}
                                    {currentMatch.preferences?.smoking !== undefined && (
                                        <Chip label={currentMatch.preferences.smoking ? '🚬 Smoker' : '🚭 Non-smoker'} size="small" />
                                    )}
                                    {currentMatch.preferences?.pets !== undefined && (
                                        <Chip label={currentMatch.preferences.pets ? '🐾 Has Pets' : 'No Pets'} size="small" />
                                    )}
                                </Box>
                                {currentMatch.interests && currentMatch.interests.length > 0 && (
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                            Interests:
                                        </Typography>
                                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                                            {currentMatch.interests.map((interest, idx) => (
                                                <Chip key={idx} label={interest} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Swipe Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
                            <IconButton
                                onClick={() => handleSwipe('left')}
                                sx={{
                                    width: 70,
                                    height: 70,
                                    background: 'white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    '&:hover': { background: '#ffebee', transform: 'scale(1.1)' }
                                }}
                            >
                                <Close sx={{ fontSize: 40, color: '#f44336' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => navigate(`/match-profile/${currentMatch._id}`)}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    background: 'white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    '&:hover': { background: '#e3f2fd', transform: 'scale(1.1)' }
                                }}
                            >
                                <Info sx={{ fontSize: 30, color: '#2196f3' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => handleSwipe('right')}
                                sx={{
                                    width: 70,
                                    height: 70,
                                    background: 'white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    '&:hover': { background: '#e8f5e9', transform: 'scale(1.1)' }
                                }}
                            >
                                <Favorite sx={{ fontSize: 40, color: '#4caf50' }} />
                            </IconButton>
                        </Box>

                        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                            {matches.length - currentIndex} potential roommate{matches.length - currentIndex !== 1 ? 's' : ''} remaining
                        </Typography>
                    </Box>
                ) : null}
            </Container>
        </Box>
    );
};

export default RoommateMatching;