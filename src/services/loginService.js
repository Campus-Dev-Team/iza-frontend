import axios from 'axios';
import { endpoints } from './apiConfig';

export const login = async (username, telefono) => {
    try {
      const response = await axios.post(endpoints.login, { username, telefono });
      const token = response.data.token;
      console.log(token);
  
      localStorage.setItem('token', token);
  
      return token; 
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
    }
  };