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
    ? `You are a professional translation model with deep understanding of linguistic context.

Translate the following text from ${sourceLanguage} to standard ${targetLanguage}.

• Convey the **intended tone and meaning**, especially in informal or offensive language — do **not** translate literally.
• Do NOT translate slang words literally.
• Do not respond like a chatbot.
• Return only the translated text.
• Translate **only if** the input is in any variation of ${sourceLanguage}. If not, return it as-is without changes.
• Preserve structure like line breaks, paragraph breaks, or spacing **if they matter to the meaning.**.

Input:
${text}`
    : `You are a professional translation model with deep understanding of linguistic context.

Detect the language of the following input (including regional dialects, slang, informal speech, and culturally specific insults or humor) and translate it to standard ${targetLanguage}.

• Convey the **intended tone and meaning**, especially in informal or offensive language — do **not** translate literally.
• Do NOT translate slang words literally.
• Do not respond like a chatbot.
• Return only the translated text.
• Preserve structure like line breaks, paragraph breaks, or spacing **if they matter to the meaning.**.

Input:
${text}`;

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
