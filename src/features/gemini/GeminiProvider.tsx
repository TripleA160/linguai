import { useCallback, useState, type ReactNode, type RefObject } from "react";
import { GeminiContext } from "./GeminiContext";
import type { GeminiContextData } from "../../types/firebase-types";
import { generateTranslation } from "./gemini-utils";
import { useFirestore } from "../firestore/useFirestore";
import { useAuth } from "../auth/useAuth";
import {
  translatorDetectLanguage,
  type TranslatorLanguage,
} from "../../utils/translator-utils";

export const GeminiProvider = ({ children }: { children: ReactNode }) => {
  const { addTranslationToUserHistory } = useFirestore();
  const { currentUser } = useAuth();

  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [currentSourceLanguage, setCurrentSourceLanguage] = useState<
    string | null
  >(null);
  const [currentTargetLanguage, setCurrentTargetLanguage] = useState<
    string | null
  >(null);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  const translate = useCallback(
    async (
      text: string,
      targetLanguage: TranslatorLanguage = {
        code: "en",
        name: "English",
        direction: "ltr",
      },
      sourceLanguage: TranslatorLanguage = translatorDetectLanguage,
      isCancelledRef?: RefObject<boolean>,
    ) => {
      const prompt = text.trim();
      if (!prompt) return null;
      if (
        prompt === currentPrompt &&
        sourceLanguage.code === currentSourceLanguage &&
        targetLanguage.code === currentTargetLanguage
      )
        return currentResponse;

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
        targetLanguage.name,
        sourceLanguage.name,
      );

      if (isCancelledRef && isCancelledRef.current) return null;

      if (typeof result === "string") {
        setCurrentSourceLanguage(sourceLanguage.code);
        setCurrentTargetLanguage(targetLanguage.code);
        setCurrentResponse(result);
        setCurrentPrompt(prompt);
        if (currentUser) {
          await addTranslationToUserHistory({
            sourceText: prompt,
            translatedText: result,
            sourceLanguage: sourceLanguage.code,
            targetLanguage: targetLanguage.code,
          });
        }
        console.log(`${sourceLanguage ? sourceLanguage : "Detected"}:`, prompt);
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
      currentSourceLanguage,
      currentTargetLanguage,
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
