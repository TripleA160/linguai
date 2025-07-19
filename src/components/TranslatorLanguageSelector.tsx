import { useLocalization } from "../features/localization/useLocalization";
import { type TranslatorLanguage } from "../utils/translator-utils";

type Props = {
  value: TranslatorLanguage;
  onChange: (lang: TranslatorLanguage) => void;
  languages: TranslatorLanguage[];
  id: string;
  label?: string;
  accessibilityLabel?: string;
};

const TranslatorLanguageSelector = ({
  value,
  onChange,
  languages,
  id,
  label,
  accessibilityLabel,
}: Props) => {
  const { currentLocale } = useLocalization();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <label
        dir="auto"
        htmlFor={id}
        className="text-sm text-secondary-200 dark:text-secondary-dark-200"
      >
        {label ? label : currentLocale.settings.language}:
      </label>
      <select
        id={id}
        value={value.code}
        onChange={(e) => {
          const selected = languages.find(
            (lang) => lang.code === e.target.value,
          );
          if (selected) onChange(selected);
        }}
        className="border transition-all duration-180 focus:drop-shadow-button-1 border-border-100
          dark:border-border-200 hover:border-secondary-dark-100
          dark:hover:border-secondary-100 focus-visible:border-secondary-dark-100
          dark:focus-visible:border-secondary-100 active:border-secondary-dark-200
          dark:active:border-secondary-200 text-primary-200 dark:text-primary-dark-200
          bg-background-200 dark:bg-background-dark-200 rounded-md px-2 py-1 text-sm
          outline-none"
        aria-label={
          accessibilityLabel ? accessibilityLabel : label || "Select language"
        }
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TranslatorLanguageSelector;
