import { type ChangeEvent } from "react";
import { useLocalization } from "../features/localization/useLocalization";
import { useTooltip } from "../features/tooltip/useTooltip";
import {
  translatorDetectLanguage,
  type TranslatorLanguage,
} from "../utils/translator-utils";

type Props = {
  type?: "source" | "target";
  value: TranslatorLanguage;
  onChange: (lang: TranslatorLanguage) => void;
  languages: TranslatorLanguage[];
  id: string;
  label?: string;
  accessibilityLabel?: string;
};

const TranslatorLanguageSelector = ({
  type = "source",
  value,
  onChange,
  languages,
  id,
  label,
  accessibilityLabel,
}: Props) => {
  const { currentLocale } = useLocalization();
  const tooltip = useTooltip();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected =
      e.target.value === "detect"
        ? translatorDetectLanguage
        : languages.find((lang) => lang.code === e.target.value);
    if (selected) {
      onChange(selected);
      if (type === "source")
        localStorage.setItem("sourceLanguage", selected.code);
      else localStorage.setItem("targetLanguage", selected.code);
      e.currentTarget.blur();
    }
    tooltip.hideTooltip();
  };

  return (
    <div className="w-full md:w-auto flex flex-col items-center justify-center gap-2">
      <label
        dir="auto"
        htmlFor={id}
        className="hidden md:block text-sm text-secondary-200 dark:text-secondary-dark-200"
        onMouseEnter={() => {
          tooltip.showTooltip(
            400,
            "sm",
            accessibilityLabel
              ? accessibilityLabel
              : label || currentLocale.settings.selectLanguage,
          );
        }}
        onMouseLeave={() => tooltip.hideTooltip()}
      >
        {label ? label : currentLocale.settings.selectLanguage}:
      </label>
      <select
        id={id}
        value={value.code}
        onChange={handleChange}
        className="max-w-full border transition-all duration-180 focus:drop-shadow-button-1
          border-border-100 dark:border-border-200 hover:border-secondary-dark-100
          dark:hover:border-secondary-100 focus-visible:border-secondary-dark-100
          dark:focus-visible:border-secondary-100 active:border-secondary-dark-200
          dark:active:border-secondary-200 text-primary-200 dark:text-primary-dark-200
          bg-background-200 dark:bg-background-dark-200 rounded-md px-2 py-1 text-sm
          text-center outline-none"
        aria-label={
          accessibilityLabel
            ? accessibilityLabel
            : label || currentLocale.settings.selectLanguage
        }
        onMouseEnter={() => {
          tooltip.showTooltip(
            400,
            "sm",
            accessibilityLabel
              ? accessibilityLabel
              : label || currentLocale.settings.selectLanguage,
          );
        }}
        onMouseLeave={() => tooltip.hideTooltip()}
      >
        {type === "source" && (
          <option key={"detect"} value={"detect"}>
            {currentLocale.translator.detectLanguage}
          </option>
        )}
        {languages
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.localName ? `${lang.name} | ${lang.localName}` : lang.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default TranslatorLanguageSelector;
