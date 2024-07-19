"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getLocalStorage } from "../store";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  useEffect(() => {
    const authToken = getLocalStorage("authToken");

    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    const login = document.getElementById("login");
    const loginEmail = document.getElementById("email");
    const loginPassword = document.getElementById("password");
    const logout = document.getElementById("logout");

    const button = document.getElementById("read");

    const logo = document.getElementById("logo");
    if (theme === "dark") {
      root.style.setProperty("--background", "#0a0a0a");
      root.style.setProperty("--foreground", "#ededed");

      login?.classList.add("bg-white");
      login?.classList.add("dark:bg-gray-700");

      loginEmail?.classList.add("text-gray-700");
      loginEmail?.classList.add("dark:text-gray-200");
      loginEmail?.classList.add("dark:bg-gray-600");

      loginPassword?.classList.add("text-gray-700");
      loginPassword?.classList.add("dark:text-gray-200");
      loginPassword?.classList.add("dark:bg-gray-600");

      logout?.classList.add("bg-white");
      logout?.classList.add("dark:bg-gray-700");

      logo?.style.removeProperty("filter");

      button?.style.removeProperty("--button-secondary-hover");
    } else {
      login?.classList.remove("bg-white");
      login?.classList.remove("dark:bg-gray-700");

      loginEmail?.classList.remove("text-gray-700");
      loginEmail?.classList.remove("dark:text-gray-200");
      loginEmail?.classList.remove("dark:bg-gray-600");

      loginPassword?.classList.remove("text-gray-700");
      loginPassword?.classList.remove("dark:text-gray-200");
      loginPassword?.classList.remove("dark:bg-gray-600");

      logo?.style.setProperty("filter", "none");

      button?.style.setProperty("--button-secondary-hover", "#cccc");

      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
    }
    if (!authToken) {
      if (pathname !== "/login") {
        if (pathname !== "/logout") {
          window.location.href = "/login";
        }
      }
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
