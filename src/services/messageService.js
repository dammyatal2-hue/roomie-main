import api from './api';

export const messageService = {
  getConversations: async (userId) => {
    const response = await api.get(`/messages/conversations/${userId}`);
    return response.data;
  },

  getConversation: async (userId1, userId2) => {
    const response = await api.get(`/messages/conversation/${userId1}/${userId2}`);
    return response.data;
  },

  sendMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  markAsRead: async (messageId) => {
    const response = await api.patch(`/messages/${messageId}/read`);
    return response.data;
  }
};
