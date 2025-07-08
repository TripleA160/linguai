export type ThemeContextData = {
  currentTheme: "Light" | "Dark";
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
};
