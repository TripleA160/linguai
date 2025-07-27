import type { UserCredential, User } from "firebase/auth";
import type { RefObject } from "react";
import type { Timestamp } from "firebase/firestore/lite";

export type AuthContextData = {
  currentUser: User | null;
  signup: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<UserCredential | null>;
  login: (email: string, password: string) => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  updateProfile: (
    data: {
      email?: string;
      displayName?: string;
    },
    password?: string,
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
    sourceLanguage: string | null,
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
  createdAt: Timestamp;
};

export type SavedTranslationsItem = {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: Timestamp;
};
