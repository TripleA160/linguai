import { useContext } from "react";
import { LocalizationContext } from "./LocalizationContext";

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context)
    throw new Error("useLocalization must be used within LocalizationProvider");
  return context;
};
