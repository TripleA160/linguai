import { createContext } from "react";
import type { GeminiContextData } from "../../types/firebase-types";

export const GeminiContext = createContext<GeminiContextData>({
  currentPrompt: null,
  currentResponse: null,
  translate: () => Promise.resolve(null),
  isRateLimited: false,
});
