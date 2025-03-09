import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (credentials, navigate) => {
    console.log("🔹 Mock login with:", credentials);
    const mockUser = { id: "12345", username: credentials.username, email: credentials.email };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", "mock-static-token");
    // navigate("/dashboard"); // Use navigate instead of window.location.href
  };

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthActions = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    throw new Error("useAuthActions must be used within an AuthProvider");
  }

  const handleLogin = async (credentials) => {
    auth.login(credentials, navigate);
    navigate('/dashboard')
  };

  const handleLogout = () => {
    auth.logout(navigate);
  };

  return { handleLogin, handleLogout };
};

export default AuthContext;
