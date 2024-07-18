"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { loginAPI } from "../api/login";
import { getLocalStorage, setLocalStorage } from "../store";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
// thời gian tồn tại của localStorage
const expiresIn = 1800;
// key của localStorage
const key = "authToken";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const authToken = getLocalStorage(key);
    if (authToken) {
      window.location.href = "/";
    }
  });
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await loginAPI(email, password);
      if (user) {
        // luu vao localStorage
        setLocalStorage(key, user, expiresIn);
        window.location.href = "/";
      } else {
        console.log(user);
        console.log("login failed");
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
