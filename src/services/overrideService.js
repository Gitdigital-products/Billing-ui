import api from './api';

export const overrideService = {
  // Get all overrides
  getOverrides: async (params = {}) => {
    const response = await api.get('/overrides', { params });
    return response.data;
  },

  // Create new override
  createOverride: async (overrideData) => {
    const response = await api.post('/overrides', overrideData);
    return response.data;
  },

  // Update existing override
  updateOverride: async (overrideId, updates) => {
    const response = await api.put(`/overrides/${overrideId}`, updates);
    return response.data;
  },

  // Delete/revoke override
  revokeOverride: async (overrideId, reason = '') => {
    const response = await api.delete(`/overrides/${overrideId}`, {
      data: { reason },
    });
    return response.data;
  },

  // Get override types
  getOverrideTypes: async () => {
    const response = await api.get('/overrides/types');
    return response.data;
  },

  // Get override statistics
  getStats: async () => {
    const response = await api.get('/overrides/stats');
    return response.data;
  },

  // Validate override request
  validateOverride: async (overrideData) => {
    const response = await api.post('/overrides/validate', overrideData);
    return response.data;
  },

  // Get override history for customer
  getCustomerOverrides: async (customerId) => {
    const response = await api.get(`/overrides/customer/${customerId}`);
    return response.data;
  },

  // Approve pending override
  approveOverride: async (overrideId, approverNotes = '') => {
    const response = await api.post(`/overrides/${overrideId}/approve`, {
      approverNotes,
    });
    return response.data;
  },

  // Reject pending override
  rejectOverride: async (overrideId, rejectReason = '') => {
    const response = await api.post(`/overrides/${overrideId}/reject`, {
      rejectReason,
    });
    return response.data;
  },
};

export default overrideService;
