import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import type {
  SavedTranslationsItem,
  TranslationHistoryItem,
  User,
} from "../../types/firebase-types";

export async function updateUserInDB(
  user: User,
  data: { email?: string; displayName?: string },
  firstUpdate: boolean = false,
) {
  if (!user) return;

  const db = getFirestore();
  const userDoc = doc(db, "users", user.uid);

  if (firstUpdate) {
    await setDoc(
      userDoc,
      { ...data, createdAt: serverTimestamp() },
      { merge: true },
    );
  } else {
    await setDoc(userDoc, data, { merge: true });
  }
}

export async function addTranslationToHistory(
  user: User,
  translation: {
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  },
) {
  if (!user || !translation) return;

  const db = getFirestore();
  const translationsHistoryCollection = collection(
    db,
    "users",
    user.uid,
    "translation_history",
  );
  await addDoc(translationsHistoryCollection, {
    ...translation,
    createdAt: serverTimestamp(),
  });
}

export async function deleteTranslationFromHistory(
  user: User,
  translationID: string,
) {
  if (!user || !translationID) return;

  const db = getFirestore();
  const translationDoc = doc(
    db,
    "users",
    user.uid,
    "translation_history",
    translationID,
  );
  await deleteDoc(translationDoc);
}

export async function getTranslationsFromHistory(user: User) {
  if (!user) return [];

  const db = getFirestore();
  const translationHistoryCollection = collection(
    db,
    "users",
    user.uid,
    "translation_history",
  );
  const q = query(translationHistoryCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TranslationHistoryItem[];
}

export async function addTranslationToSaved(
  user: User,
  translation: {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  },
) {
  if (!user || !translation) return;

  const db = getFirestore();
  const translationDoc = doc(
    db,
    "users",
    user.uid,
    "saved_translations",
    translation.id,
  );
  await setDoc(translationDoc, {
    sourceText: translation.sourceText,
    translatedText: translation.translatedText,
    sourceLanguage: translation.sourceLanguage,
    targetLanguage: translation.targetLanguage,
    createdAt: serverTimestamp(),
  });
}

export async function deleteTranslationFromSaved(
  user: User,
  translationID: string,
) {
  if (!user || !translationID) return;

  const db = getFirestore();
  const translationDoc = doc(
    db,
    "users",
    user.uid,
    "saved_translations",
    translationID,
  );
  await deleteDoc(translationDoc);
}

export async function getTranslationsFromSaved(user: User) {
  if (!user) return [];

  const db = getFirestore();
  const savedTranslationsCollection = collection(
    db,
    "users",
    user.uid,
    "saved_translations",
  );
  const q = query(savedTranslationsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SavedTranslationsItem[];
}
