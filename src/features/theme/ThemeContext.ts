import { createContext } from "react";
import type { ThemeContextData } from "../../types/theme-types";

export const ThemeContext = createContext<ThemeContextData>({
  currentTheme: "Light",
  setLightTheme: () => {},
  setDarkTheme: () => {},
  toggleTheme: () => {},
});
