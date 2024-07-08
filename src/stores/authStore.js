import { makeAutoObservable } from 'mobx';
import axiosInstance from '../api/axiosInstance';

class AuthStore {
  authToken = localStorage.getItem('authToken') || '';
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return !!this.authToken;
  }

  setToken(token) {
    localStorage.setItem('authToken', token);
    this.authToken = token;
  }

  deleteToken() {
    localStorage.removeItem('authToken');
    this.authToken = '';
  }

  async login(username, password) {
    try {
      const response = await axiosInstance.post('http://95.78.254.210:10202/api/v1/auth/token/', { username, password });
      const token = response.data.token;
      this.setToken(token);
      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  async logout() {
    this.deleteToken();
  }
}

export const authStore = new AuthStore();
