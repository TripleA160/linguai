import { useContext } from "react";
import { GeminiContext } from "./GeminiContext";

export const useGemini = () => {
  const context = useContext(GeminiContext);
  if (!context) throw new Error("useGemini must be used within GeminiProvider");
  return context;
};
