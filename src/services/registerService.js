import axios from 'axios';
import { endpoints } from './apiConfig';

export const register = async (username, telefono) => {
    try {
      const response = await axios.post(endpoints.register, { username, telefono });
      const token = response.data.token;
      console.log(token);
  
      localStorage.setItem('token', token);
  
      return token; 
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
    }
  };