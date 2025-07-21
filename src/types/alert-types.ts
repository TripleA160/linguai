export type AlertContextData = {
  alertType: "info" | "success" | "warning" | "error";
  currentText: string | null;
  isVisible: boolean;
  changeText: (text: string | null) => void;
  hideAlert: () => void;
  showAlert: (
    type: "info" | "success" | "warning" | "error",
    duration?: number,
    text?: string,
  ) => void;
  toggleAlert: () => void;
};
