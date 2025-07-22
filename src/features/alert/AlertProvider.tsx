import { useRef, useState, type ReactNode } from "react";
import { AlertContext } from "./AlertContext";

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertType, setAlertType] = useState<
    "info" | "success" | "warning" | "error"
  >("success");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string | null>(null);

  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef<boolean>(false);

  const changeText = (text: string | null = null) => {
    setCurrentText(text);
  };

  const hideAlert = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }

    if (!isVisibleRef.current) return;

    setIsVisible(false);
    isVisibleRef.current = false;
  };

  const showAlert = (
    type: "info" | "success" | "warning" | "error" = "info",
    duration: number = 1500,
    text?: string,
  ) => {
    if (isVisible) return;

    hideTimeout.current = null;
    if (text) setCurrentText(text);
    setAlertType(type);
    setIsVisible(true);
    isVisibleRef.current = true;

    if (duration > 0) {
      hideTimeout.current = setTimeout(hideAlert, duration);
    }
  };

  const toggleAlert = () => {
    if (isVisible) {
      hideAlert();
    } else {
      showAlert();
    }
  };

  return (
    <AlertContext.Provider
      value={{
        alertType,
        currentText,
        isVisible,
        changeText,
        hideAlert,
        showAlert,
        toggleAlert,
      }}
    >
      <div
        dir="auto"
        className={`fixed z-1000 select-none
          ${alertType === "info" ? "bg-gray-400/15 dark:bg-gray-700/15 text-gray-900 dark:text-gray-200" : alertType === "success" ? "bg-green-300/20 dark:bg-green-700/20 text-green-800 dark:text-green-200" : alertType === "warning" ? "bg-yellow-200/15 dark:bg-yellow-700/25 text-yellow-600 dark:text-yellow-200" : "bg-red-200/20 dark:bg-red-800/10 text-red-600 dark:text-red-200"}
          backdrop-blur-xs border-none rounded-md text-lg w-auto left-1/2 -translate-x-1/2
          truncate p-1.5 text-shadow-md/22 shadow-md transition-[opacity,_top]
          duration-350 ${isVisible ? "opacity-100 top-12" : "opacity-0 top-0"}`}
      >
        {currentText && currentText}
      </div>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
