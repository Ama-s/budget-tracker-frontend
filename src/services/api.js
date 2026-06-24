import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8085';

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export default api;