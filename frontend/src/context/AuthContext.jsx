import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("portfolio_token") || null);
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("portfolio_token"));

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("portfolio_token", data.token);
    setToken(data.token);
    setIsAdmin(true);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("portfolio_token");
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
