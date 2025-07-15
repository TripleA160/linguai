import type { Language, Locale } from "../../types/localization-types";

const loadedLocales: Partial<Record<Language, Locale>> = {};

const localeLoaders: Record<Language, () => Promise<{ default: Locale }>> = {
  en: () => import("../../locales/en"),
};

export const loadLocale = async (lang: Language): Promise<Locale> => {
  if (!loadedLocales[lang]) {
    const locale = await localeLoaders[lang]();
    loadedLocales[lang] = locale.default;
  }

  return loadedLocales[lang];
};
