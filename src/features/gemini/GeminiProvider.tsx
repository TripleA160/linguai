import { useCallback, useState, type ReactNode, type RefObject } from "react";
import { GeminiContext } from "./GeminiContext";
import type { GeminiContextData } from "../../types/firebase-types";
import { generateTranslation } from "./gemini-utils";
import { useFirestore } from "../firestore/useFirestore";
import { useAuth } from "../auth/useAuth";

export const GeminiProvider = ({ children }: { children: ReactNode }) => {
  const { addTranslationToUserHistory } = useFirestore();
  const { currentUser } = useAuth();

  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  const translate = useCallback(
    async (
      text: string,
      targetLanguage: string = "English",
      sourceLanguage: string | null,
      isCancelledRef?: RefObject<boolean>,
    ) => {
      const prompt = text.trim();
      if (!prompt) return null;
      if (prompt === currentPrompt) return currentResponse;

      const currentTime = Date.now();
      const timeDifference = currentTime - lastRequestTime;

      if (timeDifference < 1000) {
        setIsRateLimited(true);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 - timeDifference),
        );
        setIsRateLimited(false);
      }
      setLastRequestTime(Date.now());

      if (isCancelledRef && isCancelledRef.current) return null;

      const result = await generateTranslation(
        prompt,
        targetLanguage,
        sourceLanguage,
      );

      if (isCancelledRef && isCancelledRef.current) return null;

      if (typeof result === "string") {
        setCurrentResponse(result);
        setCurrentPrompt(prompt);
        if (currentUser) {
          await addTranslationToUserHistory({
            sourceText: prompt,
            translatedText: result,
            sourceLanguage: sourceLanguage ? sourceLanguage : "Detect language",
            targetLanguage: targetLanguage,
          });
        }
        console.log(`${sourceLanguage}:`, prompt);
        console.log(`${targetLanguage}:`, result);
      }
      return result;
    },
    [
      currentUser,
      lastRequestTime,
      addTranslationToUserHistory,
      currentPrompt,
      currentResponse,
    ],
  );

  const contextData: GeminiContextData = {
    currentPrompt,
    currentResponse,
    translate,
    isRateLimited,
  };

  return (
    <GeminiContext.Provider value={contextData}>
      {children}
    </GeminiContext.Provider>
  );
};
