export type TranslatorLanguage = {
  code: string;
  name: string;
  direction: "ltr" | "rtl";
};

export const translatorLanguages: TranslatorLanguage[] = [
  { code: "en", name: "English", direction: "ltr" },
  { code: "ar", name: "Arabic", direction: "rtl" },
  { code: "es", name: "Spanish", direction: "ltr" },
  { code: "fr", name: "French", direction: "ltr" },
];
