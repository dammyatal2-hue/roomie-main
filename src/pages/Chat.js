import React, { useState, useEffect, useRef } from 'react';
import { messageService } from '../services/messageService';
import { chatRequestService } from '../services/chatRequestService';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  TextField,
  Paper,
  Badge,
  Button,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RichMessageInput from '../components/RichMessageInput';

const mockConversations = {
  1: {
    user: { id: 2, name: 'Sarah Johnson', avatar: 'SJ', online: true },
    messages: [
      { id: 1, senderId: 2, text: 'Hi! I saw your interest in the Rose Garden apartment', time: '10:30 AM', isMine: false },
      { id: 2, senderId: 1, text: 'Yes! Is it still available?', time: '10:32 AM', isMine: true },
      { id: 3, senderId: 2, text: 'The apartment is still available!', time: '10:35 AM', isMine: false },
      { id: 4, senderId: 2, text: 'Would you like to schedule a viewing?', time: '10:35 AM', isMine: false },
      { id: 5, senderId: 1, text: 'That would be great! When are you available?', time: '10:40 AM', isMine: true }
    ]
  },
  2: {
    user: { id: 3, name: 'Alex Chen', avatar: 'AC', online: true },
    messages: [
      { id: 1, senderId: 3, text: 'Hey! I think we would be great roommates', time: '9:15 AM', isMine: false },
      { id: 2, senderId: 1, text: 'Hi Alex! I saw your profile too', time: '9:20 AM', isMine: true },
      { id: 3, senderId: 3, text: 'When can we schedule a viewing?', time: '9:25 AM', isMine: false }
    ]
  },
  3: {
    user: { id: 4, name: 'John Doe', avatar: 'JD', online: false },
    messages: [
      { id: 1, senderId: 1, text: 'Hi, is the shared room still available?', time: 'Yesterday', isMine: true },
      { id: 2, senderId: 4, text: 'Yes it is! Would you like more details?', time: 'Yesterday', isMine: false },
      { id: 3, senderId: 1, text: 'Thanks for the information', time: 'Yesterday', isMine: true }
    ]
  }
};

export default function Chat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [chatStatus, setChatStatus] = useState({ allowed: false, status: 'none' });
  const [requestMessage, setRequestMessage] = useState('Hi! I would like to connect with you.');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    checkChatStatus();
    loadConversation();
  }, [id]);

  const checkChatStatus = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) return;
      
      const status = await chatRequestService.checkChatAllowed(currentUser._id || currentUser.id, id);
      setChatStatus(status);
    } catch (error) {
      console.error('Error checking chat status:', error);
      setChatStatus({ allowed: false, status: 'none' });
    }
  };

  const sendChatRequest = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      await chatRequestService.sendRequest(currentUser._id || currentUser.id, id, requestMessage);
      setChatStatus({ allowed: false, status: 'pending' });
    } catch (error) {
      console.error('Error sending request:', error);
      alert(error.response?.data?.message || 'Failed to send request');
    }
  };

  const loadConversation = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) return;

      const messagesData = await messageService.getConversation(currentUser.id, id);
      
      const formattedMessages = messagesData.map(msg => ({
        id: msg._id,
        senderId: msg.senderId._id,
        text: msg.message,
        time: new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isMine: msg.senderId._id === currentUser.id
      }));

      setMessages(formattedMessages);
      
      if (messagesData.length > 0) {
        const otherUserId = messagesData[0].senderId._id === currentUser.id 
          ? messagesData[0].receiverId 
          : messagesData[0].senderId;
        setOtherUser({
          id: otherUserId._id,
          name: otherUserId.name,
          avatar: otherUserId.avatar,
          online: true
        });
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      const conversation = mockConversations[id];
      if (conversation) {
        setMessages(conversation.messages);
        setOtherUser(conversation.user);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (messageData) => {
    if (!chatStatus.allowed) {
      alert('Chat request must be accepted first');
      return;
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      const newMessage = {
        senderId: currentUser._id || currentUser.id,
        receiverId: id,
        message: messageData.content,
        type: messageData.type,
        mediaUrl: messageData.type !== 'text' ? messageData.content : undefined
      };

      const savedMessage = await messageService.sendMessage(newMessage);
      
      setMessages([...messages, {
        id: savedMessage._id,
        senderId: currentUser._id || currentUser.id,
        text: messageData.content,
        type: messageData.type,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isMine: true
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!otherUser && chatStatus.status === 'none') {
    return null;
  }

  if (!chatStatus.allowed) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
        <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
          <Toolbar>
            <IconButton edge="start" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
              Chat Request
            </Typography>
            <Box sx={{ width: 48 }} />
          </Toolbar>
        </AppBar>
        
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Paper sx={{ p: 4, maxWidth: 400, textAlign: 'center', borderRadius: '12px' }}>
            {chatStatus.status === 'pending' ? (
              <>
                <Alert severity="info" sx={{ mb: 2 }}>Request Pending</Alert>
                <Typography variant="h6" gutterBottom>Waiting for Approval</Typography>
                <Typography variant="body2" color="text.secondary">
                  Your chat request is pending. You'll be notified when it's accepted.
                </Typography>
              </>
            ) : chatStatus.status === 'denied' ? (
              <>
                <Alert severity="error" sx={{ mb: 2 }}>Request Denied</Alert>
                <Typography variant="h6" gutterBottom>Request Not Accepted</Typography>
                <Typography variant="body2" color="text.secondary">
                  Your chat request was not accepted.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>Send Chat Request</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Send a request to start chatting
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Introduce yourself..."
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={sendChatRequest}
                  sx={{ borderRadius: '8px' }}
                >
                  Send Request
                </Button>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ background: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/messages')}>
            <ArrowBackIcon />
          </IconButton>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            sx={{
              ml: 1,
              '& .MuiBadge-badge': {
                backgroundColor: otherUser.online ? '#44b700' : '#bdbdbd',
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: '2px solid white'
              }
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
                fontWeight: 'bold'
              }}
            >
              {otherUser.avatar}
            </Avatar>
          </Badge>
          <Box sx={{ ml: 2, flex: 1 }}>
            <Typography variant="body1" fontWeight="bold">
              {otherUser.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {otherUser.online ? 'Online' : 'Offline'}
            </Typography>
          </Box>
          <IconButton color="inherit">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          background: '#f5f5f5'
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.isMine ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Paper
              elevation={1}
              sx={{
                maxWidth: '70%',
                p: 1.5,
                borderRadius: msg.isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.isMine
                  ? 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)'
                  : 'white',
                color: msg.isMine ? 'white' : 'text.primary'
              }}
            >
              {msg.type === 'image' ? (
                <img src={msg.text} alt="sent" style={{ maxWidth: '100%', borderRadius: '8px' }} />
              ) : msg.type === 'voice' || msg.type === 'audio' ? (
                <audio controls src={msg.text} style={{ maxWidth: '100%' }} />
              ) : (
                <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                  {msg.text}
                </Typography>
              )}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 0.5,
                  opacity: 0.8,
                  textAlign: 'right'
                }}
              >
                {msg.time}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Paper elevation={3} sx={{ p: 2, background: 'white', borderTop: '1px solid #e0e0e0' }}>
        <RichMessageInput onSend={handleSend} disabled={!chatStatus.allowed} />
      </Paper>
    </Box>
  );
}
