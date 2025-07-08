export type Language = {
  code: string;
  name: string;
  direction: "ltr" | "rtl";
};

export const languages: Language[] = [
  { code: "en", name: "English", direction: "ltr" },
  { code: "ar", name: "Arabic", direction: "rtl" },
  { code: "es", name: "Spanish", direction: "ltr" },
  { code: "fr", name: "French", direction: "ltr" },
];
