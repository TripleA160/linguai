import { AIError } from "firebase/ai";
import { FirebaseError } from "firebase/app";

const authErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "This email is already in use.",
  "auth/invalid-email":
    "This email address is not valid. Please check and try again.",
  "auth/weak-password": "Your password is too weak.",
  "auth/invalid-credential":
    "Incorrect email or password. Try again or sign up.",
  "auth/user-not-found": "Incorrect email or password. Try again or sign up.",
  "auth/wrong-password": "Incorrect email or password. Try again or sign up.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
};

export const formatFirebaseError = (error: FirebaseError | unknown): string => {
  if (error instanceof FirebaseError) {
    return (
      authErrorMessages[error.code] ||
      "An unexpected error occurred, please try again."
    );
  }
  return "An unexpected error occurred, please try again.";
};

export function formatAIError(error: AIError | unknown) {
  if (error instanceof AIError) {
    if (error.message.includes("429"))
      return "Gemini usage limit reached. Try again in a moment.";
    if (error.message.includes("500"))
      return "An unexpected error occurred on Google's side. Try again in a moment.";
    if (error.message.includes("503"))
      return "The system is experiencing a temporary issue. Try again in a moment.";
    if (error.message.includes("504"))
      return "The request took too long to process. Try simplifying it or retrying later.";

    return "An unexpected error occurred, Try again in a moment.";
  }
  return "An unexpected error occurred, Try again in a moment.";
}
