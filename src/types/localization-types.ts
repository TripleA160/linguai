import type { RefObject } from "react";

export type Language = "en" | "ar";

export type LanguageMeta = {
  code: Language;
  name: string;
  englishName?: string;
  direction: "ltr" | "rtl";
};

export type Locale = {
  auth: {
    signUp: string;
    login: string;
    logout: string;
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
    profileInfo: string;
    security: string;
    apply: string;
    verificationSent: string;
  };
  settings: {
    auto: string;
    toggleAuto: string;
    theme: string;
    light: string;
    dark: string;
    toggleTheme: string;
    language: string;
    selectLanguage: string;
  };
  translator: {
    placeholder: string;
    translating: string;
    sourceLanguage: string;
    targetLanguage: string;
    save: string;
    saved: string;
    copy: string;
    copied: string;
    switch: string;
    selectSourceLanguage: string;
    selectTargetLanguage: string;
  };
  navigation: {
    appSettings: string;
    accountSettings: string;
    history: string;
    saved: string;
    delete: string;
  };
  errors: {
    form: {
      nameMissing: string;
      emailMissing: string;
      passwordMissing: string;
      passwordConfirmationMissing: string;
      passwordInvalidLength: string;
      passwordInvalidCharacter: string;
      passwordInvalidStart: string;
      passwordNoLowercase: string;
      passwordNoUppercase: string;
      passwordDoNotMatch: string;
    };
    auth: {
      "auth/email-already-in-use": string;
      "auth/invalid-email": string;
      "auth/weak-password": string;
      "auth/invalid-credential": string;
      "auth/user-not-found": string;
      "auth/wrong-password": string;
      "auth/user-disabled": string;
      "auth/too-many-requests": string;
      "auth/operation-not-allowed": string;
      unexpected: string;
    };
    ai: {
      "429": string;
      "500": string;
      "503": string;
      "504": string;
      unexpected: string;
    };
  };
};

export type LocalizationContextData = {
  supportedLanguages: RefObject<LanguageMeta[]>;
  currentLanguage: LanguageMeta;
  currentLocale: Locale;
  changeLanguage: (lang: Language) => Promise<void>;
};
