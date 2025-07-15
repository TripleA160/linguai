import { createContext } from "react";
import type {
  Locale,
  LocalizationContextData,
} from "../../types/localization-types";

export const LocalizationContext = createContext<LocalizationContextData>({
  currentLanguage: "en",
  currentLocale: {} as Locale,
  changeLanguage: () => Promise.resolve(),
});
