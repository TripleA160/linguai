import { createContext } from "react";
import type { FirestoreContextData } from "../../types/firebase-types";

export const FirestoreContext = createContext<FirestoreContextData>({
  updateProfileInDB: () => Promise.resolve(),
  addTranslationToUserHistory: () => Promise.resolve(),
  deleteTranslationFromUserHistory: () => Promise.resolve(),
  addTranslationToUserSaved: () => Promise.resolve(),
  deleteTranslationFromUserSaved: () => Promise.resolve(),
  initialTranslationHistory: null,
  translationHistory: null,
  savedTranslations: null,
});
