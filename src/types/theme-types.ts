export type ThemeContextData = {
  currentTheme: "light" | "dark";
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
};
