import React, { useState, useRef } from 'react';
import { Box, IconButton, TextField, Menu, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ImageIcon from '@mui/icons-material/Image';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const emojis = ['😊', '😂', '❤️', '👍', '🎉', '😍', '🔥', '✨', '💯', '🙌', '😎', '🤔', '😢', '😡', '🤗', '👏'];

export default function RichMessageInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [recording, setRecording] = useState(false);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend({ type: 'text', content: message });
      setMessage('');
    }
  };

  const handleEmojiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji);
    setAnchorEl(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSend({ type: 'image', content: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          onSend({ type: 'voice', content: reader.result });
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
      <IconButton size="small" onClick={handleEmojiClick}>
        <EmojiEmotionsIcon />
      </IconButton>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <IconButton size="small" onClick={() => fileInputRef.current?.click()}>
        <ImageIcon />
      </IconButton>

      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        disabled={disabled}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '24px',
            background: '#f5f5f5'
          }
        }}
      />

      {message.trim() ? (
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{
            background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)',
            color: 'white',
            '&:hover': { background: 'linear-gradient(135deg, #FE456A 0%, #FF6B8B 100%)', opacity: 0.9 }
          }}
        >
          <SendIcon />
        </IconButton>
      ) : (
        <IconButton
          color={recording ? 'error' : 'default'}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
        >
          <MicIcon />
        </IconButton>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, p: 1 }}>
          {emojis.map((emoji) => (
            <MenuItem key={emoji} onClick={() => handleEmojiSelect(emoji)} sx={{ fontSize: '24px' }}>
              {emoji}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
}
