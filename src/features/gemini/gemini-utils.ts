import { useContext } from "react";
import { geminiModels } from "../../config/firebase";
import { GeminiContext } from "./GeminiContext";

let currentModelIndex = 0;

export function useGemini() {
  return useContext(GeminiContext);
}

export async function generateTranslation(
  text: string,
  targetLanguage: string = "English",
  sourceLanguage?: string | null,
) {
  const input = text.trim();

  const prompt =
    sourceLanguage &&
    sourceLanguage !== "detect" &&
    sourceLanguage !== "Detect language"
      ? `You are a professional translation model with deep understanding of linguistic context.

Translate the following text from ${sourceLanguage} to standard ${targetLanguage}.

• Convey the **intended tone and meaning**, especially in informal or offensive language — do **not** translate literally.
• Do NOT translate slang words literally.
• Do not respond like a chatbot.
• Return only the translated text.
• Translate **only if** the input is in any variation of ${sourceLanguage}. If not, return it as-is without changes.
• Preserve structure like line breaks, paragraph breaks, or spacing **if they matter to the meaning.**.

Input:
${input}`
      : `You are a professional translation model with deep understanding of linguistic context.

Detect the language of the following input (including regional dialects, slang, informal speech, and culturally specific insults or humor) and translate it to standard ${targetLanguage}.

• Convey the **intended tone and meaning**, especially in informal or offensive language — do **not** translate literally.
• Do NOT translate slang words literally.
• Do not respond like a chatbot.
• Return only the translated text.
• Preserve structure like line breaks, paragraph breaks, or spacing **if they matter to the meaning.**.

Input:
${input}`;

  const models =
    input.length < 500
      ? [
          geminiModels.gemini25Flash,
          geminiModels.gemini20Flash,
          geminiModels.gemini20Lite,
        ]
      : [
          geminiModels.gemini20Lite,
          geminiModels.gemini25Flash,
          geminiModels.gemini20Flash,
        ];

  let lastError: unknown;

  for (let i = 0; i < models.length; i++) {
    try {
      const result = await models[i].model.generateContent(prompt);
      currentModelIndex = i;
      console.log("Model:", models[i].name, "| Length:", input.length);
      return result.response.text();
    } catch (error) {
      if (i < models.length - 1 && i === currentModelIndex) {
        console.warn(
          `${models[i].name} Model failed, trying ${models[i + 1].name}...`,
        );
      }
      lastError = error;
    }
  }

  throw lastError;
}
