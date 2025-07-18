import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  type Locale,
  type Language,
  type LocalizationContextData,
  type LanguageMeta,
} from "../../types/localization-types";
import { LocalizationContext } from "./LocalizationContext";
import { initialLocale, languagesMeta, loadLocale } from "./localization-utils";

const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const supportedLanguages = useRef<LanguageMeta[]>(languagesMeta);

  const [currentLanguage, setCurrentLanguage] = useState<LanguageMeta>(
    languagesMeta[0],
  );
  const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale);
  const [loading, setLoading] = useState(true);

  const changeLanguage = async (lang: Language) => {
    const language = supportedLanguages.current.find(
      (language) => language.code === lang,
    );
    if (language) {
      setCurrentLanguage(language);
      setCurrentLocale(await loadLocale(lang));
      localStorage.setItem("language", lang);
    }
  };

  useEffect(() => {
    const init = async () => {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage) await changeLanguage(savedLanguage);
      setLoading(false);
    };

    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextData: LocalizationContextData = {
    supportedLanguages,
    currentLanguage,
    currentLocale,
    changeLanguage,
  };

  if (loading) return null;

  return (
    <LocalizationContext.Provider value={contextData}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
