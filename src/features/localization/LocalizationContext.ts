import { createContext } from "react";
import type {
  Locale,
  LocalizationContextData,
} from "../../types/localization-types";

export const LocalizationContext = createContext<LocalizationContextData>({
  supportedLanguages: { current: [] },
  currentLanguage: { code: "en", name: "English", direction: "ltr" },
  currentLocale: {} as Locale,
  changeLanguage: () => Promise.resolve(),
});
