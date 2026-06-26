import axios from 'axios';

const API_BASE_URL = 'https://hangouthub-app.pxxl.run/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token
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

// Interceptor untuk handle error 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH API ============
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// ============ ACTIVITIES API ============
export const activitiesAPI = {
  getAll: (params) => api.get('/activities', { params }),
  getById: (id) => api.get(`/activities/${id}`),
  getCities: () => api.get('/cities'),
};

// ============ PLANS API ============
export const plansAPI = {
  getAll: () => api.get('/plans'),
  create: (data) => api.post('/plans', data),
  updateStatus: (id, status) => api.patch(`/plans/${id}`, { status }),
  delete: (id) => api.delete(`/plans/${id}`),
};

export default api;