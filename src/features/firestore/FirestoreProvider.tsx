import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth } from "../auth/useAuth";
import type {
  FirestoreContextData,
  SavedTranslationsItem,
  TranslationHistoryItem,
} from "../../types/firebase-types";
import { FirestoreContext } from "./FirestoreContext";
import {
  addTranslationToHistory,
  addTranslationToSaved,
  deleteTranslationFromHistory,
  deleteTranslationFromSaved,
  getTranslationsFromHistory,
  getTranslationsFromSaved,
  updateUserInDB,
} from "./firestore-utils";
import type { User } from "firebase/auth";

export const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();

  const [initialTranslationHistory, setInitialTranslationHistory] = useState<
    TranslationHistoryItem[] | null
  >(null);
  const [translationHistory, setTranslationHistory] = useState<
    TranslationHistoryItem[] | null
  >(null);
  const [savedTranslations, setSavedTranslations] = useState<
    SavedTranslationsItem[] | null
  >(null);

  const isInitialHistory = useRef<boolean>(true);

  async function updateProfileInDB(
    data: {
      email?: string;
      displayName?: string;
    },
    user?: User,
  ) {
    if (user) {
      return updateUserInDB(user, data);
    } else if (currentUser) {
      return updateUserInDB(currentUser, data);
    }
  }

  async function addTranslationToUserSaved(translation: {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  }) {
    if (!currentUser) return;

    await addTranslationToSaved(currentUser, translation);
    const updatedSaved = await getTranslationsFromSaved(currentUser);
    setSavedTranslations(updatedSaved);
  }

  async function addTranslationToUserHistory(translation: {
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  }) {
    if (!currentUser) return;

    await addTranslationToHistory(currentUser, translation);
    const updatedHistory = await getTranslationsFromHistory(currentUser);
    setTranslationHistory(updatedHistory);
  }

  async function deleteTranslationFromUserHistory(translationID: string) {
    if (!currentUser) return;

    await deleteTranslationFromHistory(currentUser, translationID);

    const updatedHistory = await getTranslationsFromHistory(currentUser);
    setTranslationHistory(updatedHistory);
    setInitialTranslationHistory(updatedHistory);
  }

  async function deleteTranslationFromUserSaved(translationID: string) {
    if (!currentUser) return;

    await deleteTranslationFromSaved(currentUser, translationID);

    const updatedSaved = await getTranslationsFromSaved(currentUser);
    setSavedTranslations(updatedSaved);
  }

  useEffect(() => {
    if (!currentUser) {
      setInitialTranslationHistory(null);
      setTranslationHistory(null);
      setSavedTranslations(null);
      return;
    }
    const updateHistory = async () => {
      const updatedHistory = await getTranslationsFromHistory(currentUser);
      setTranslationHistory(updatedHistory);
      console.log(updatedHistory);
    };
    const updateSaved = async () => {
      const updatedSaved = await getTranslationsFromSaved(currentUser);
      setSavedTranslations(updatedSaved);
    };
    updateHistory();
    updateSaved();
  }, [currentUser]);

  useEffect(() => {
    if (translationHistory && isInitialHistory.current) {
      setInitialTranslationHistory(translationHistory);
      isInitialHistory.current = false;
    }
  }, [translationHistory, initialTranslationHistory]);

  const contextData: FirestoreContextData = {
    updateProfileInDB,
    addTranslationToUserHistory,
    deleteTranslationFromUserHistory,
    addTranslationToUserSaved,
    deleteTranslationFromUserSaved,
    initialTranslationHistory,
    translationHistory,
    savedTranslations,
  };

  return (
    <FirestoreContext.Provider value={contextData}>
      {children}
    </FirestoreContext.Provider>
  );
};
