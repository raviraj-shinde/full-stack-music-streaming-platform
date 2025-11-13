import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("adminUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const isAdmin = () => {
    return user && user.role === "ADMIN";
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data) {
        setToken(response.data.token);
        setUser({ email: response.data.email, role: response.data.role });

        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            email: response.data.email,
            role: response.data.role,
          })
        );

        return { success: true };
      } else {
        return {
          success: false,
          message: response?.data?.message || "Login failed",
        };
      }
    } catch (error) {
      // Prevent crash when response or data is missing
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Network error";

      return {
        success: false,
        message,
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  };

  const contextValue = {
    user,
    token,
    loading,
    login,
    isAuthenticated,
    isAdmin,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
