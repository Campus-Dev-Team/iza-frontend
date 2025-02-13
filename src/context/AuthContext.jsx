import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { isTokenExpired } from '../lib/tokenUtils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired(token);
  });

  const loginStorage = (userName, city) => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userCity', city);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('city');
    localStorage.removeItem('userCity');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        logout();
      }
    };

    const interval = setInterval(checkToken, 30000);
    
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      clearInterval(interval);
      axios.interceptors.response.eject(interceptor);
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginStorage, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);