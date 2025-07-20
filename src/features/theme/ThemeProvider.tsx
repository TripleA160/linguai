import { useEffect, useState, type ReactNode } from "react";
import type { ThemeContextData } from "../../types/theme-types";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<"auto" | "light" | "dark">(
    "auto",
  );

  const setAutoTheme = (saveTheme: boolean = true) => {
    setCurrentTheme("auto");
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkTheme(false, true);
    } else {
      setLightTheme(false, true);
    }
    if (saveTheme) localStorage.setItem("theme", "auto");
  };
  const setLightTheme = (
    saveTheme: boolean = true,
    isAuto: boolean = false,
  ) => {
    document.documentElement.classList.remove("dark");
    if (!isAuto) setCurrentTheme("light");
    if (saveTheme) localStorage.setItem("theme", "light");
  };
  const setDarkTheme = (saveTheme: boolean = true, isAuto: boolean = false) => {
    document.documentElement.classList.add("dark");
    if (!isAuto) setCurrentTheme("dark");
    if (saveTheme) localStorage.setItem("theme", "dark");
  };

  const toggleTheme = (saveTheme: boolean = true, isAuto: boolean = false) => {
    if (currentTheme === "light") setDarkTheme(saveTheme, isAuto);
    else setLightTheme(saveTheme, isAuto);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      setAutoTheme();
      return;
    }

    switch (savedTheme) {
      case "auto":
        setAutoTheme();
        break;
      case "dark":
        setDarkTheme();
        break;
      case "light":
        setLightTheme();
        break;

      default:
        setAutoTheme();
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextData: ThemeContextData = {
    currentTheme,
    setAutoTheme,
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
