import api from './api';

export const favoriteService = {
  getAll: async (userId) => {
    const response = await api.get(`/favorites/user/${userId}`);
    return response.data;
  },

  add: async (userId, propertyId) => {
    const response = await api.post('/favorites', { userId, propertyId });
    return response.data;
  },

  remove: async (userId, propertyId) => {
    const response = await api.delete(`/favorites/${userId}/${propertyId}`);
    return response.data;
  },

  check: async (userId, propertyId) => {
    const response = await api.get(`/favorites/check/${userId}/${propertyId}`);
    return response.data;
  }
};

export default favoriteService;
