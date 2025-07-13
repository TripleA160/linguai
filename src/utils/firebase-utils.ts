import { AIError } from "firebase/ai";
import { FirebaseError } from "firebase/app";

const authErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "This email is already used.",
  "auth/invalid-email": "This email is not valid, please check and try again.",
  "auth/weak-password": "Password is too weak.",
  "auth/user-not-found": "Wrong email or password, try again or signup.",
  "auth/wrong-password": "Wrong email or password, try again or signup.",
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
