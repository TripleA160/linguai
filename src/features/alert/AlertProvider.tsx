import { useRef, useState, type ReactNode } from "react";
import { AlertContext } from "./AlertContext";

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertType, setAlertType] = useState<
    "info" | "success" | "warning" | "error"
  >("info");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string | null>(
    "Test Test Test Test Test Test Test Test Test",
  );

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
          ${alertType === "info" ? "bg-gray-100/20 text-gray-800 dark:text-gray-200" : alertType === "success" ? "bg-green-300/30 dark:bg-green-400/30 text-green-700 dark:text-green-200" : alertType === "warning" ? "bg-yellow-800/25 text-yellow-200" : "bg-red-200/25 text-red-600 dark:text-red-500"}
          backdrop-blur-xs border-none rounded-md font-medium text-lg w-auto left-1/2
          -translate-x-1/2 truncate p-1.5 text-shadow-md/22 shadow-md
          transition-[opacity,_top] duration-350
          ${isVisible ? "opacity-100 top-4" : "opacity-0 -top-4"}`}
      >
        {currentText && currentText}
      </div>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
