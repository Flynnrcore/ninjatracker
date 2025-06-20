const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const API_URLS = {
  login: `${API_BASE_URL}/api/login`,
  register: `${API_BASE_URL}/api/register`,
  logout: `${API_BASE_URL}/api/logout`,
  csrf: `${API_BASE_URL}/api/csrf-token`,
  session: `${API_BASE_URL}/api/session`,
  refresh: `${API_BASE_URL}/api/refresh`,
  trainings: `${API_BASE_URL}/api/trainings`,
  statistics: `${API_BASE_URL}/api/trainings/stats`,
};
