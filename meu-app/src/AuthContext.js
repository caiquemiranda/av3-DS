import React, { createContext, useState, useEffect } from 'react';
import { loginUsuario, logoutUsuario } from './services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      setUsuario(JSON.parse(userJson));
    }
  }, []);

  const login = (email, senha) => {
    return loginUsuario(email, senha).then((user) => {
      setUsuario(user);
      return user;
    });
  };

  const logout = () => {
    logoutUsuario();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
