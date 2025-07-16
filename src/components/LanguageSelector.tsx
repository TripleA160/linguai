import type { ChangeEvent } from "react";
import { useLocalization } from "../features/localization/useLocalization";

type Props = {
  label?: string;
};

const LanguageSelector = ({ label }: Props) => {
  const { supportedLanguages, changeLanguage, currentLocale, currentLanguage } =
    useLocalization();

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = supportedLanguages.current.find(
      (lang) => lang.code === e.target.value,
    );
    if (selected) {
      changeLanguage(selected.code);
    }
  };

  return (
    <div
      className={`flex items-center justify-center gap-2
        ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
    >
      <label
        dir="auto"
        htmlFor="language-select"
        className="text-sm text-primary-100 dark:text-primary-dark-100"
      >
        {label ? label : currentLocale.settings.language}:
      </label>
      <select
        id="language-select"
        value={currentLanguage.code}
        onChange={handleSelect}
        className="border transition-all duration-180 focus:drop-shadow-button-1 border-border-100
          dark:border-none rounded-md px-2 py-1 text-sm text-primary-200
          dark:text-primary-dark-200 bg-background-200 dark:bg-background-dark-200
          outline-none"
      >
        {supportedLanguages.current.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} {lang.englishName && `(${lang.englishName})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
