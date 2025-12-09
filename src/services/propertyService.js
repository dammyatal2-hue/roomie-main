import api from './api';

export const propertyService = {
  getAll: async () => {
    const response = await api.get('/properties');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  create: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  update: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  getByOwner: async (ownerId) => {
    const response = await api.get(`/properties/owner/${ownerId}`);
    return response.data;
  }
};

export default propertyService;
