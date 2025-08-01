import { useContext } from "react";
import { TextSizeContext } from "./TextSizeContext";

export const useTextSize = () => {
  const context = useContext(TextSizeContext);
  if (!context)
    throw new Error("useTextSize must be used within TextSizeProvider");
  return context;
};
