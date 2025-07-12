import { useEffect, useRef, useState, type ReactNode } from "react";
import { TooltipContext } from "./TooltipContext";

const TooltipProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [direction, setDirection] = useState<{
    x: "left" | "right";
    y: "top" | "bottom";
  }>({ x: "left", y: "top" });

  const currentMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const delayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeText = (text: string | null = null) => {
    setCurrentText(text);
  };

  const hideTooltip = () => {
    if (delayTimeout.current) {
      clearTimeout(delayTimeout.current);
      delayTimeout.current = null;
    }
    if (!isVisible) return;

    setIsVisible(false);
  };

  const showTooltip = (delay: number = 0) => {
    if (isVisible) return;

    if (delay > 0) {
      delayTimeout.current = setTimeout(() => {
        setPosition(currentMousePosition.current);
        setDirection({
          x:
            currentMousePosition.current.x + 252 > window.innerWidth
              ? "left"
              : "right",
          y:
            currentMousePosition.current.y > window.innerHeight
              ? "top"
              : "bottom",
        });
        setIsVisible(true);
        delayTimeout.current = null;
      }, delay);
    } else {
      setPosition(currentMousePosition.current);
      setDirection({
        x:
          currentMousePosition.current.x + 252 > window.innerWidth
            ? "left"
            : "right",
        y:
          currentMousePosition.current.y > window.innerHeight
            ? "top"
            : "bottom",
      });
      setIsVisible(true);
    }
  };

  const toggleTooltip = () => {
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };

  const move = (x?: number, y?: number) => {
    if (x && y) setPosition({ x, y });
    else if (x) setPosition({ x, y: position.y });
    else if (y) setPosition({ x: position.x, y });
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      currentMousePosition.current = { x: event.clientX, y: event.clientY };

      if (isVisible) {
        setPosition({
          x: event.clientX,
          y: event.clientY,
        });
        setDirection({
          x: event.clientX + 252 > window.innerWidth ? "left" : "right",
          y: event.clientY + 44 > window.innerHeight ? "top" : "bottom",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isVisible]);

  return (
    <TooltipContext.Provider
      value={{
        currentText,
        isVisible,
        changeText,
        hideTooltip,
        showTooltip,
        toggleTooltip,
        move,
      }}
    >
      <div
        style={{
          ...(direction.x === "left"
            ? { right: `${window.innerWidth - position.x + 6}px` }
            : { left: `${position.x + 12}px` }),
          ...(direction.y === "top"
            ? { bottom: `${window.innerHeight - position.y + 6}px` }
            : { top: `${position.y + 12}px` }),
        }}
        className={`fixed z-1000 pointer-events-none text-primary-100 dark:text-primary-dark-100
          bg-background-100 dark:bg-background-dark-100 border border-border-100
          dark:border-none rounded-md font-light max-w-60 max-h-8 truncate pr-2 pl-2
          shadow-md transition-opacity ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        {currentText && currentText}
      </div>
      {children}
    </TooltipContext.Provider>
  );
};

export default TooltipProvider;
