import { AIError } from "firebase/ai";
import { FirebaseError } from "firebase/app";
import type { Locale } from "../types/localization-types";

export const formatFirebaseError = (
  error: FirebaseError | unknown,
  type: keyof Locale["errors"]["auth"],
  locale: Locale,
): string => {
  if (error instanceof FirebaseError) {
    const authLocale = locale.errors.auth[type];
    return (
      authLocale[error.code as keyof typeof authLocale] ||
      locale.errors.auth.unexpected
    );
  }
  return locale.errors.auth.unexpected;
};

export function formatAIError(error: AIError | unknown, locale: Locale) {
  if (error instanceof AIError) {
    if (error.message.includes("429")) return locale.errors.ai[429];
    if (error.message.includes("500")) return locale.errors.ai[500];
    if (error.message.includes("503")) return locale.errors.ai[503];
    if (error.message.includes("504")) return locale.errors.ai[504];

    return locale.errors.ai.unexpected;
  }
  return locale.errors.ai.unexpected;
}
