import { AIError } from "firebase/ai";
import { FirebaseError } from "firebase/app";
import { FirestoreError } from "firebase/firestore";

export const formatFirebaseError = (error: FirebaseError | unknown): string => {
  return error instanceof FirebaseError
    ? error.message.replace("Firebase: ", "").replace(/\(auth.*\)\.?/, "")
    : "An unexpected error occurred";
};

export const formatFirestoreError = (
  error: FirestoreError | unknown,
): string => {
  return error instanceof FirestoreError
    ? error.message.replace("Firebase: ", "").replace(/\(auth.*\)\.?/, "")
    : "An unexpected error occurred";
};

export function formatAIError(error: AIError | unknown) {
  return error instanceof AIError
    ? error.message.replace("Firebase: ", "").replace(/\(auth.*\)\.?/, "")
    : "An unexpected error occurred";
}
