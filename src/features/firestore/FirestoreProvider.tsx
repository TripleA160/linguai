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

  async function updateProfileInDB(data: {
    email?: string;
    username?: string;
    displayName?: string;
  }) {
    return updateUserInDB(currentUser, data);
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
    deleteTranslationFromHistory(currentUser, translationID);

    const updatedHistory = await getTranslationsFromHistory(currentUser);
    setTranslationHistory(updatedHistory);
  }

  async function deleteTranslationFromUserSaved(translationID: string) {
    deleteTranslationFromSaved(currentUser, translationID);

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
    console.log("Init History:", initialTranslationHistory);
    console.log("History:", translationHistory);
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
