import { type TranslatorLanguage } from "../utils/translator-utils";

type Props = {
  value: TranslatorLanguage;
  onChange: (language: TranslatorLanguage) => void;
  languages: TranslatorLanguage[];
  label: string;
  id: string;
};

const LanguageSelector = ({ value, onChange, languages, label, id }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <label
        htmlFor={id}
        className="text-sm text-secondary-200 dark:text-secondary-dark-200"
      >
        {label}
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
          dark:border-none rounded-md px-2 py-1 text-sm text-primary-200
          dark:text-primary-dark-200 bg-background-200 dark:bg-background-dark-200
          outline-none"
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

export default LanguageSelector;
