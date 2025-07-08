import { useContext } from "react";
import { geminiModelMain, geminiModelLite } from "../../config/firebase";
import { GeminiContext } from "./GeminiContext";
import { AIError } from "firebase/ai";

export function useGemini() {
  return useContext(GeminiContext);
}

export async function generateTranslation(
  text: string,
  targetLanguage: string = "English",
  sourceLanguage?: string,
) {
  const prompt = sourceLanguage
    ? `You are a professional translation assistant.

    Translate the text **only if it is written in any dialect or variation of the ${sourceLanguage} language** (e.g., Modern Standard, colloquial, regional).

    If the text is not in ${sourceLanguage}, **do not translate it** — just return the input exactly as it is, without formatting, corrections, or changes.
    
    Preserve any line breaks, paragraph breaks, or spacing **if they contribute to the structure or meaning** of the text (e.g., poetry, conversations, lists).

    Translate the following text from ${sourceLanguage} to ${targetLanguage}:

    ${text}

    Only return the translated text in ${targetLanguage}. Do not include any explanations, transliterations, or additional text.`
    : `You are a professional translation assistant.

    Preserve any line breaks, paragraph breaks, or spacing **if they contribute to the structure or meaning** of the text (e.g., poetry, conversations, lists).

    Detect the language of the following text and translate it to ${targetLanguage}.

    ${text}

    Only return the translated text in ${targetLanguage}. Do not include any explanations, transliterations, or additional text.`;

  try {
    const result = await geminiModelMain.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    if (error instanceof AIError) {
      try {
        console.log("Falling back to lite model...");
        const liteResult = await geminiModelLite.generateContent(prompt);
        return liteResult.response.text();
      } catch (error) {
        if (error instanceof AIError) throw error;
        throw new Error("An unexpected error occurred");
      }
    }
    throw new Error("An unexpected error occurred");
  }
}
