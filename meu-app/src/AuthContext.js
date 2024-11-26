import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(
    !!localStorage.getItem('token')
  );

  const login = () => {
    setAutenticado(true);
    localStorage.setItem('token', 'meuTokenSecreto');
  };

  const logout = () => {
    setAutenticado(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
