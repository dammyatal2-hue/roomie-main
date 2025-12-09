import api from './api';

export const roommateService = {
  getPotentialRoommates: async (userId) => {
    const response = await api.get(`/roommates/potential/${userId}`);
    return response.data;
  },

  getMatches: async (userId) => {
    const response = await api.get(`/roommates/matches/user/${userId}`);
    return response.data;
  },

  sendMatchRequest: async (matchData) => {
    const response = await api.post('/roommates/matches', matchData);
    return response.data;
  },

  updateMatchStatus: async (matchId, status) => {
    const response = await api.patch(`/roommates/matches/${matchId}/status`, { status });
    return response.data;
  }
};
