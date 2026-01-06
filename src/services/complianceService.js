import api from './api';

export const complianceService = {
  // Get all compliance cases
  getComplianceCases: async (params = {}) => {
    const response = await api.get('/compliance/cases', { params });
    return response.data;
  },

  // Get specific compliance case
  getComplianceCase: async (caseId) => {
    const response = await api.get(`/compliance/cases/${caseId}`);
    return response.data;
  },

  // Approve compliance case
  approveCase: async (caseId, notes = '') => {
    const response = await api.post(`/compliance/cases/${caseId}/approve`, { notes });
    return response.data;
  },

  // Reject compliance case
  rejectCase: async (caseId, notes = '') => {
    const response = await api.post(`/compliance/cases/${caseId}/reject`, { notes });
    return response.data;
  },

  // Escalate compliance case
  escalateCase: async (caseId, notes = '') => {
    const response = await api.post(`/compliance/cases/${caseId}/escalate`, { notes });
    return response.data;
  },

  // Get compliance metrics
  getMetrics: async () => {
    const response = await api.get('/compliance/metrics');
    return response.data;
  },

  // Get audit trail for compliance actions
  getAuditTrail: async (caseId) => {
    const response = await api.get(`/compliance/cases/${caseId}/audit`);
    return response.data;
  },

  // Search compliance cases
  searchCases: async (searchParams) => {
    const response = await api.post('/compliance/cases/search', searchParams);
    return response.data;
  },

  // Get compliance rules
  getRules: async () => {
    const response = await api.get('/compliance/rules');
    return response.data;
  },

  // Update compliance rule
  updateRule: async (ruleId, updates) => {
    const response = await api.put(`/compliance/rules/${ruleId}`, updates);
    return response.data;
  },
};

export default complianceService;
