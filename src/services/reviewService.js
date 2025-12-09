import api from './api';

export const reviewService = {
  getByProperty: async (propertyId) => {
    const response = await api.get(`/reviews/property/${propertyId}`);
    return response.data;
  },

  create: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  }
};

export default reviewService;
