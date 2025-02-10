import axios from 'axios';
import { endpoints } from './apiConfig';
import { isTokenExpired } from '../lib/tokenUtils';

export const login = async (data) => {
  try {
    const response = await axios.post(endpoints.login, data);
    const token = response.data.token;
    
    if (!token || isTokenExpired(token)) {
      throw new Error('Invalid or expired token');
    }
    
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};