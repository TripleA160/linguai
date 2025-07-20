export type ThemeContextData = {
  currentTheme: "auto" | "light" | "dark";
  setAutoTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
};
