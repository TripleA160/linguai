import { useEffect, useState, type ReactNode } from "react";
import {
  type Locale,
  type Language,
  type LocalizationContextData,
} from "../../types/localization-types";
import { LocalizationContext } from "./LocalizationContext";
import { loadLocale } from "./localization-utils";

const LocalizatonProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [currentLocale, setCurrentLocale] = useState<Locale>({} as Locale);
  const [loading, setLoading] = useState(true);

  const changeLanguage = async (lang: Language) => {
    setCurrentLanguage(lang);
    setCurrentLocale(await loadLocale(lang));
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;

    const init = async () => {
      const lang = savedLanguage || currentLanguage;
      await changeLanguage(lang);
      setLoading(false);
    };

    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextData: LocalizationContextData = {
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

export default LocalizatonProvider;
