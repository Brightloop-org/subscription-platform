import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach Authorization token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept 401 responses to auto-logout on expired session
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes('/login') &&
      !window.location.pathname.includes('/register')
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const loginApi = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const registerApi = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

export const getMeApi = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const forgotPasswordApi = async (emailData) => {
  const res = await api.post('/auth/forgot-password', emailData);
  return res.data;
};

export const resetPasswordApi = async (token, passwordData) => {
  const res = await api.post(`/auth/reset-password/${token}`, passwordData);
  return res.data;
};

export const createStaffApi = async (staffData) => {
  const res = await api.post('/auth/staff', staffData);
  return res.data;
};

export const getStaffApi = async () => {
  const res = await api.get('/auth/staff');
  return res.data;
};

export default api;

