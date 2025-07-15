import { createContext } from "react";
import type { ThemeContextData } from "../../types/theme-types";

export const ThemeContext = createContext<ThemeContextData>({
  currentTheme: "light",
  setLightTheme: () => {},
  setDarkTheme: () => {},
  toggleTheme: () => {},
});
