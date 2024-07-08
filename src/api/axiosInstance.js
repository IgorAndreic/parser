import axios from 'axios';
import { authStore } from '../stores/authStore';

const axiosInstance = axios.create({
  baseURL: 'http://95.78.254.210:10201/api/v1/', // Adjust the base URL as needed
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStore.authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
