import type { Locale } from "../types/localization-types";

const en: Locale = {
  auth: {
    signUp: "Sign Up",
    login: "Login",
    logout: "Logout",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    displayName: "Name",
    profileInfo: "Profile Info",
    security: "Security",
    apply: "Apply",
  },
  settings: {
    auto: "Auto",
    toggleAuto: "Automatic theme",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    toggleTheme: "Toggle theme",
    language: "Language",
    selectLanguage: "Select language",
  },
  translator: {
    placeholder: "Type here...",
    translating: "Translating...",
    sourceLanguage: "From",
    targetLanguage: "To",
    save: "Save",
    saved: "Saved",
    copy: "Copy",
    copied: "Copied",
    switch: "Switch",
    selectSourceLanguage: "Select input language",
    selectTargetLanguage: "Select translation language",
  },
  navigation: {
    appSettings: "App settings",
    accountSettings: "Account settings",
    history: "History",
    saved: "Saved",
    delete: "Delete",
  },
  errors: {
    form: {
      nameMissing: "Please enter a name.",
      emailMissing: "Please enter an email.",
      passwordMissing: "Please enter a password.",
      passwordConfirmationMissing: "Please confirm your password.",
      passwordInvalidLength: "Password must contain at least 8 characters.",
      passwordInvalidCharacter:
        "Password can only use English letters, numbers, and common special characters.",
      passwordInvalidStart: "Password must start with a letter.",
      passwordNoLowercase:
        "Password must contain at least one lowercase character.",
      passwordNoUppercase:
        "Password must contain at least one uppercase character.",
      passwordDoNotMatch: "Passwords do not match.",
    },
    auth: {
      "auth/email-already-in-use": "This email is already in use.",
      "auth/invalid-email":
        "This email address is not valid. Please check and try again.",
      "auth/weak-password": "Your password is too weak.",
      "auth/invalid-credential":
        "Incorrect email or password. Try again or sign up.",
      "auth/user-not-found":
        "Incorrect email or password. Try again or sign up.",
      "auth/wrong-password":
        "Incorrect email or password. Try again or sign up.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
      "auth/operation-not-allowed":
        "Please verify the account. Check the verification link sent your email.",
      unexpected: "An unexpected error occurred, please try again.",
    },
    ai: {
      "429": "Gemini usage limit reached. Try again in a moment.",
      "500":
        "An unexpected error occurred on Google's side. Try again in a moment.",
      "503":
        "The system is experiencing a temporary issue. Try again in a moment.",
      "504":
        "The request took too long to process. Try simplifying it or retrying later.",
      unexpected: "An unexpected error occurred, Try again in a moment.",
    },
  },
};

export default en;
