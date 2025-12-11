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
import { roommateService } from '../services/roommateService';
import { formatPriceWithPeriod } from '../utils/currency';

const RoommateMatching = () => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

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
                                                src={match.avatar}
                                                sx={{ 
                                                    width: 60, 
                                                    height: 60, 
                                                    mr: 2,
                                                    bgcolor: 'primary.main'
                                                }}
                                            >
                                                {match.name?.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6">
                                                    {match.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {match.occupation || 'Professional'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {match.matchScore && (
                                            <Chip
                                                label={`${match.matchScore}% Match`}
                                                color={
                                                    match.matchScore >= 80 ? 'success' :
                                                    match.matchScore >= 60 ? 'warning' : 'default'
                                                }
                                            />
                                        )}
                                    </Box>

                                    <Typography variant="body2" paragraph>
                                        {match.bio}
                                    </Typography>

                                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                                        <Chip
                                            icon={<LocationOn />}
                                            label={match.location || 'Kigali, Rwanda'}
                                            size="small"
                                            variant="outlined"
                                        />
                                        {match.preferences?.maxBudget && (
                                            <Chip
                                                label={formatPriceWithPeriod(match.preferences.maxBudget)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                        {match.preferences?.cleanliness && (
                                            <Chip
                                                label={`Cleanliness: ${match.preferences.cleanliness}/5`}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                        {match.preferences?.smoking !== undefined && (
                                            <Chip
                                                label={match.preferences.smoking ? 'Smoker' : 'Non-smoker'}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                        {match.preferences?.pets !== undefined && (
                                            <Chip
                                                label={match.preferences.pets ? 'Has Pets' : 'No Pets'}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                    </Box>

                                    {match.interests && match.interests.length > 0 && (
                                        <Box mb={2}>
                                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                                Interests:
                                            </Typography>
                                            <Box display="flex" flexWrap="wrap" gap={0.5}>
                                                {match.interests.slice(0, 4).map((interest, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={interest}
                                                        size="small"
                                                        sx={{ fontSize: '0.7rem' }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}

                                    <Box display="flex" gap={1}>
                                        <Button 
                                            variant="contained" 
                                            fullWidth
                                            onClick={() => navigate(`/match-profile/${match._id}`)}
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