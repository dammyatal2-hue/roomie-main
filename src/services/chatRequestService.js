import api from './api';

export const chatRequestService = {
  sendRequest: async (senderId, receiverId, message, context = 'general', contextId = null) => {
    try {
      const response = await api.post('/chat-requests', { senderId, receiverId, message, context, contextId });
      return response.data;
    } catch (error) {
      console.error('Send request error:', error.response?.data || error.message);
      throw error;
    }
  },

  getPendingRequests: async (userId) => {
    try {
      const response = await api.get(`/chat-requests/pending/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get pending requests error:', error.response?.data || error.message);
      return [];
    }
  },

  acceptRequest: async (requestId) => {
    try {
      const response = await api.patch(`/chat-requests/${requestId}/accepted`);
      return response.data;
    } catch (error) {
      console.error('Accept request error:', error.response?.data || error.message);
      throw error;
    }
  },

  denyRequest: async (requestId) => {
    try {
      const response = await api.patch(`/chat-requests/${requestId}/denied`);
      return response.data;
    } catch (error) {
      console.error('Deny request error:', error.response?.data || error.message);
      throw error;
    }
  },

  checkChatAllowed: async (userId1, userId2) => {
    try {
      const response = await api.get(`/chat-requests/check/${userId1}/${userId2}`);
      return response.data;
    } catch (error) {
      console.error('Check chat allowed error:', error.response?.data || error.message);
      return { allowed: false, status: 'none' };
    }
  }
};
