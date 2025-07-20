import { useLocalization } from "../features/localization/useLocalization";
import AutoThemeButton from "./AutoThemeButton";
import ThemeToggle from "./ThemeToggle";

const ThemeSettings = () => {
  const { currentLocale, currentLanguage } = useLocalization();

  return (
    <div
      className={`select-none w-full flex justify-between items-center
        ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
    >
      <div dir="auto">{currentLocale.settings.theme}:</div>
      <div
        className={`flex w-3/5 gap-2
          ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
      >
        <ThemeToggle />
        <AutoThemeButton />
      </div>
    </div>
  );
};

export default ThemeSettings;
