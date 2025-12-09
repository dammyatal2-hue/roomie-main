import api from './api';

export const bookingService = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async (userId) => {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  },

  getOwnerBookings: async (ownerId) => {
    const response = await api.get(`/bookings/owner/${ownerId}`);
    return response.data;
  },

  updateStatus: async (bookingId, status, ownerResponse) => {
    const response = await api.patch(`/bookings/${bookingId}/status`, { status, ownerResponse });
    return response.data;
  }
};
