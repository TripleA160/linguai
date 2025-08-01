import type { ChangeEvent } from "react";
import { useLocalization } from "../features/localization/useLocalization";
import { useTooltip } from "../features/tooltip/useTooltip";

type Props = {
  label?: string;
  accessibilityLabel?: string;
  selectWidth?: string;
};

const LanguageSelector = ({
  label,
  accessibilityLabel,
  selectWidth,
}: Props) => {
  const { supportedLanguages, changeLanguage, currentLocale, currentLanguage } =
    useLocalization();

  const tooltip = useTooltip();

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = supportedLanguages.current.find(
      (lang) => lang.code === e.target.value,
    );
    if (selected) {
      changeLanguage(selected.code);
    }

    e.currentTarget.blur();
    tooltip.hideTooltip();
  };

  return (
    <div
      className={`no-hamburger-follow flex items-center justify-between w-full text-sm
        ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
    >
      <label
        dir="auto"
        htmlFor="language-select"
        className="text-primary-100 dark:text-primary-dark-100"
      >
        {label ? label : currentLocale.settings.language}:
      </label>
      <select
        id="language-select"
        value={currentLanguage.code}
        onChange={handleSelect}
        onClick={tooltip.hideTooltip}
        style={{ width: selectWidth ? selectWidth : "60%" }}
        className="no-hamburger-follow border transition-all duration-180
          focus:drop-shadow-button-1 border-secondary-100 dark:border-secondary-dark-100
          hover:border-secondary-200 dark:hover:border-secondary-dark-200
          focus-visible:border-secondary-200 dark:focus-visible:border-secondary-dark-200
          active:border-secondary-300 dark:active:border-secondary-dark-300
          text-primary-200 dark:text-primary-dark-200 bg-background-200
          dark:bg-background-dark-200 shadow-2xl rounded-lg px-2 py-1 outline-none"
        aria-label={
          accessibilityLabel
            ? accessibilityLabel
            : label || currentLocale.settings.selectLanguage
        }
        onMouseEnter={() => {
          tooltip.showTooltip(
            400,
            "sm",
            accessibilityLabel || currentLocale.settings.selectLanguage,
          );
        }}
        onMouseLeave={() => tooltip.hideTooltip()}
      >
        {supportedLanguages.current.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.localName ? `${lang.localName} (${lang.name})` : lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
