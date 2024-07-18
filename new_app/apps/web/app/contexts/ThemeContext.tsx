"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getLocalStorage, setLocalStorage } from "../store";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: "light",
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getInitialTheme = () => {
    const storedPrefs = window.localStorage.getItem("theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }

    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const authToken = getLocalStorage("authToken");
    if (authToken) {
      localStorage.setItem("theme", theme);
      const root = document.documentElement;

      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.setProperty("--background", "#0a0a0a");
        root.style.setProperty("--foreground", "#ededed");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
        root.style.removeProperty("--background");
        root.style.removeProperty("--foreground");
      }
    } else {
      window.location.href = "/login";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for using the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
