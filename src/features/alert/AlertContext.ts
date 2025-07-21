import { createContext } from "react";
import { type AlertContextData } from "../../types/alert-types";

export const AlertContext = createContext<AlertContextData>({
  alertType: "info",
  currentText: null,
  isVisible: false,
  changeText: () => {},
  hideAlert: () => {},
  showAlert: () => {},
  toggleAlert: () => {},
});
