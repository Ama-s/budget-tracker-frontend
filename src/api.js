import axios from 'axios';

const API_URL = 'http://localhost:8085';

const API_URL = 'https://budget-tracker-api-n9y6.onrender.com';

// Create axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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