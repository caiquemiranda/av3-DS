import React, { createContext, useState, useEffect } from "react";
import { loginUsuario, logoutUsuario } from "./services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      setUsuario(JSON.parse(userJson));
    }
  }, []);

  const login = async (email, senha) => {
    const user = await loginUsuario(email, senha);
    localStorage.setItem("user", JSON.stringify(user));
    setUsuario(user);
    return user;
  };

  const logout = () => {
    logoutUsuario();
    localStorage.removeItem("user");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
