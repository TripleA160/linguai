import type { UserCredential } from "firebase/auth";
import { auth } from "../config/firebase";
import type { RefObject } from "react";

export type User = typeof auth.currentUser;

export type AuthContextData = {
  currentUser: User;
  signup: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<UserCredential | null>;
  login: (email: string, password: string) => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (
    data: {
      email?: string;
      displayName?: string;
    },
    user?: User,
  ) => Promise<void>;
};

export type FirestoreContextData = {
  updateProfileInDB: (
    data: {
      email?: string;
      displayName?: string;
    },
    user?: User,
  ) => Promise<void>;
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
    isCancelledRef?: RefObject<boolean>,
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
