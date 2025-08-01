import { useLocalization } from "../features/localization/useLocalization";
import AutoThemeButton from "./AutoThemeButton";
import ThemeToggle from "./ThemeToggle";

const ThemeSettings = ({ toggleWidth }: { toggleWidth?: string }) => {
  const { currentLocale, currentLanguage } = useLocalization();

  return (
    <div
      className={`w-full flex justify-between items-center text-sm
        ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
    >
      <div dir="auto" className="text-primary-100 dark:text-primary-dark-100">
        {currentLocale.settings.theme}:
      </div>
      <div
        style={{ width: toggleWidth ? toggleWidth : "60%" }}
        className={`flex gap-2
          ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
      >
        <ThemeToggle />
        <AutoThemeButton />
      </div>
    </div>
  );
};

export default ThemeSettings;
