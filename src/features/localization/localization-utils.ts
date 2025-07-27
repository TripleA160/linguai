import type {
  Language,
  LanguageMeta,
  Locale,
} from "../../types/localization-types";
import en from "../../locales/en";

const loadedLocales: Partial<Record<Language, Locale>> = { en };

const localeLoaders: Record<Language, () => Promise<{ default: Locale }>> = {
  en: () => import("../../locales/en"),
  ar: () => import("../../locales/ar"),
};

export const initialLocale: Locale = en;

export const languagesMeta: LanguageMeta[] = [
  {
    code: "en",
    name: "English",
    direction: "ltr",
  },
  {
    code: "ar",
    name: "Arabic",
    localName: "العربية",
    direction: "rtl",
  },
];

export const loadLocale = async (lang: Language): Promise<Locale> => {
  if (!loadedLocales[lang]) {
    const locale = await localeLoaders[lang]();
    loadedLocales[lang] = locale.default;
  }

  return loadedLocales[lang];
};
