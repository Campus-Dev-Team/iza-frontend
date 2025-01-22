// context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verificar si hay un token y nombre de usuario al iniciar
    return localStorage.getItem('userName') !== null;
  });

  const loginStorage = (userName, city) => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userCity', city);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userCity');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginStorage, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);