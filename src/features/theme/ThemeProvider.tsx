import { useEffect, useState, type ReactNode } from "react";
import type { ThemeContextData } from "../../types/theme-types";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const setLightTheme = (saveTheme: boolean = true) => {
    document.documentElement.classList.remove("dark");
    setCurrentTheme("light");
    if (saveTheme) localStorage.setItem("theme", "light");
  };
  const setDarkTheme = (saveTheme: boolean = true) => {
    document.documentElement.classList.add("dark");
    setCurrentTheme("dark");
    if (saveTheme) localStorage.setItem("theme", "dark");
  };
  const toggleTheme = () => {
    if (currentTheme === "light") setDarkTheme();
    else setLightTheme();
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setDarkTheme(false);
      } else {
        setLightTheme(false);
      }
      return;
    }

    if (savedTheme === "dark") {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, []);

  const contextData: ThemeContextData = {
    currentTheme,
    setLightTheme,
    setDarkTheme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={contextData}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
