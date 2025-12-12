import api from './api';

export const chatRequestService = {
  sendRequest: async (senderId, receiverId, message) => {
    const response = await api.post('/chat-requests', { senderId, receiverId, message });
    return response.data;
  },

  getPendingRequests: async (userId) => {
    const response = await api.get(`/chat-requests/pending/${userId}`);
    return response.data;
  },

  acceptRequest: async (requestId) => {
    const response = await api.patch(`/chat-requests/${requestId}/accepted`);
    return response.data;
  },

  denyRequest: async (requestId) => {
    const response = await api.patch(`/chat-requests/${requestId}/denied`);
    return response.data;
  },

  checkChatAllowed: async (userId1, userId2) => {
    const response = await api.get(`/chat-requests/check/${userId1}/${userId2}`);
    return response.data;
  }
};
