import React, { useState, useEffect } from 'react';
import { messageService } from '../services/messageService';
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    lastMessage: 'The apartment is still available!',
    time: '2m ago',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Alex Chen',
    avatar: 'AC',
    lastMessage: 'When can we schedule a viewing?',
    time: '1h ago',
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: 'John Doe',
    avatar: 'JD',
    lastMessage: 'Thanks for the information',
    time: '3h ago',
    unread: 0,
    online: false
  },
  {
    id: 4,
    name: 'Emma Wilson',
    avatar: 'EW',
    lastMessage: 'Is the room still available?',
    time: '1d ago',
    unread: 1,
    online: false
  },
  {
    id: 5,
    name: 'Michael Brown',
    avatar: 'MB',
    lastMessage: 'Perfect! I\'ll take it',
    time: '2d ago',
    unread: 0,
    online: false
  }
];

export default function Messages() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        navigate('/login');
        return;
      }

      const data = await messageService.getConversations(currentUser.id);
      
      const formattedConversations = data.map(conv => ({
        id: conv.user._id,
        name: conv.user.name,
        avatar: conv.user.avatar,
        lastMessage: conv.lastMessage.message,
        time: new Date(conv.lastMessage.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        unread: conv.unreadCount,
        online: true
      }));

      setConversations(formattedConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Messages
          </Typography>
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              background: 'white'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Messages List */}
        <Paper elevation={1} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          {filteredConversations.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No messages found
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {filteredConversations.map((conversation, index) => (
                <React.Fragment key={conversation.id}>
                  <ListItem
                    button
                    onClick={() => navigate(`/chat/${conversation.id}`)}
                    sx={{
                      py: 2,
                      '&:hover': {
                        background: '#f5f5f5'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: conversation.online ? '#44b700' : '#bdbdbd',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            border: '2px solid white'
                          }
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
                            fontWeight: 'bold'
                          }}
                        >
                          {conversation.avatar}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="bold">
                            {conversation.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {conversation.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '70%',
                              fontWeight: conversation.unread > 0 ? 'bold' : 'normal'
                            }}
                          >
                            {conversation.lastMessage}
                          </Typography>
                          {conversation.unread > 0 && (
                            <Chip
                              label={conversation.unread}
                              size="small"
                              sx={{
                                background: '#FE456A',
                                color: 'white',
                                fontWeight: 'bold',
                                height: 20,
                                minWidth: 20
                              }}
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredConversations.length - 1 && (
                    <Box sx={{ px: 2 }}>
                      <Box sx={{ borderBottom: '1px solid #e0e0e0' }} />
                    </Box>
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>

        {/* Empty State for No Messages */}
        {conversations.length === 0 && (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '12px', mt: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              No Messages Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start a conversation by contacting property owners or roommates
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
