import type { FirebaseError } from "firebase/app";
import { auth } from "../config/firebase";

export type User = typeof auth.currentUser;

export type AuthContextData = {
  currentUser: User;
  signup: (
    email: string,
    password: string,
  ) => Promise<firebase.default.auth.UserCredential | FirebaseError | null>;
  login: (
    email: string,
    password: string,
  ) => Promise<firebase.default.auth.UserCredential | FirebaseError | null>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfileInAuth: (data: {
    email?: string;
    displayName?: string;
  }) => Promise<void>;
};

export type FirestoreContextData = {
  updateProfileInDB: (data: {
    email?: string;
    username?: string;
    displayName?: string;
  }) => Promise<void>;
  addTranslationToUserHistory: (translation: {
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  }) => Promise<void>;
  deleteTranslationFromUserHistory: (translationID: string) => Promise<void>;
  addTranslationToUserSaved: (translation: {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  }) => Promise<void>;
  deleteTranslationFromUserSaved: (translationID: string) => Promise<void>;
  initialTranslationHistory: TranslationHistoryItem[] | null;
  translationHistory: TranslationHistoryItem[] | null;
  savedTranslations: SavedTranslationsItem[] | null;
};

export type GeminiContextData = {
  currentPrompt: string | null;
  currentResponse: string | null;
  translate: (
    text: string,
    targetLanguage: string,
    sourceLanguage: string,
  ) => Promise<string | null>;
  isRateLimited: boolean;
};

export type TranslationHistoryItem = {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
};

export type SavedTranslationsItem = {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
};
