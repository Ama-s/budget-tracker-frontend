import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8085';

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Global 401 handler — if session expired mid-use, force back to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Reload the app — AuthContext's checkSession on mount will detect
      // the dead session and correctly show the Login page again
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API functions
export const getCategories = () => {
  return api.get('/categories');
};

export const getBudget = () => {
  return api.get('/budgets/current');
};

export const getExpenses = (page = 0, size = 20) => {
  return api.get('/expenses', { params: { page, size } });
};

export const createExpense = (expenseData) => {
  return api.post('/expenses', expenseData);
};

export default api;