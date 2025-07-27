import type { Locale } from "../types/localization-types";

const en: Locale = {
  auth: {
    signUp: "Sign Up",
    login: "Login",
    logout: "Logout",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    currentPassword: "Current password",
    newPassword: "New password",
    passwordChangeSuccess: "Your password has been changed successfully.",
    displayName: "Name",
    profileInfo: "Profile Info",
    security: "Security",
    apply: "Apply",
    change: "Change",
    verificationSent:
      "A verification link has been sent to your email. Please check your inbox.",
    newEmailVerificationSent:
      "A verification link has been sent to the new email. Please check your inbox.",
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
    detectLanguage: "Detect language",
  },
  navigation: {
    appSettings: "App Settings",
    accountSettings: "Account Settings",
    openMenu: "Open menu",
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
      currentPasswordMissing: "Please enter your current password.",
      newPasswordMissing: "Please enter the new password.",
    },
    auth: {
      signup: {
        "auth/email-already-in-use": "This email is already in use.",
        "auth/invalid-email":
          "This email address is not valid. Please check and try again.",
        "auth/weak-password": "Password is too weak.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      },
      login: {
        "auth/invalid-email":
          "This email address is not valid. Please check and try again.",
        "auth/invalid-credential":
          "Incorrect email or password. Try again or sign up.",
        "auth/user-not-found":
          "Incorrect email or password. Try again or sign up.",
        "auth/wrong-password":
          "Incorrect email or password. Try again or sign up.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      },
      profile: {
        "auth/invalid-email":
          "This email address is not valid. Please check and try again.",
        "auth/invalid-credential":
          "Incorrect password. Please check and try again.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/operation-not-allowed":
          "Please verify the account. Check the verification link sent to your email.",
        "auth/email-change-need-password":
          "Please re-enter your password to change your email address.",
      },
      passwordChange: {
        "auth/weak-password": "Password is too weak.",
        "auth/invalid-credential":
          "Current password is not correct. Please check and try again.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/operation-not-allowed":
          "Please verify the account. Check the verification link sent to your email.",
      },
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
