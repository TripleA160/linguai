import { useEffect, useRef, useState, type ReactNode } from "react";
import { TooltipContext } from "./TooltipContext";

const TooltipProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [direction, setDirection] = useState<{
    x: "left" | "right";
    y: "top" | "bottom";
  }>({ x: "left", y: "top" });

  const tooltipRef = useRef<HTMLDivElement>(null);
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

  const showTooltip = (
    delay: number = 0,
    size: "sm" | "md" | "lg" = "md",
    text?: string,
  ) => {
    if (isVisible) return;

    const show = () => {
      if (text) setCurrentText(text);
      setSize(size);
      setIsVisible(true);
      delayTimeout.current = null;
    };

    if (delay > 0) {
      delayTimeout.current = setTimeout(show, delay);
    } else {
      show();
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
    setPosition({ x: x ?? position.x, y: y ?? position.y });
  };

  useEffect(() => {
    const updatePosition = () => {
      if (!isVisible || !tooltipRef.current) return;

      const tooltipWidth =
        tooltipRef.current.getBoundingClientRect().width ?? 224;
      const tooltipHeight =
        tooltipRef.current.getBoundingClientRect().height ?? 32;

      setPosition(currentMousePosition.current);
      setDirection({
        x:
          currentMousePosition.current.x + tooltipWidth > window.innerWidth
            ? "left"
            : "right",
        y:
          currentMousePosition.current.y + tooltipHeight > window.innerHeight
            ? "top"
            : "bottom",
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      currentMousePosition.current = { x: event.clientX, y: event.clientY };
      updatePosition();
    };

    updatePosition();

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
        ref={tooltipRef}
        dir="auto"
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
          dark:border-none rounded-md font-light ${size === "sm" && "max-w-48 text-sm"} ${
          size === "md" && "max-w-52" } ${size === "lg" && "max-w-56 text-lg"} max-h-8
          truncate pr-2 pl-2 shadow-md transition-opacity duration-200
          ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        {currentText && currentText}
      </div>
      {children}
    </TooltipContext.Provider>
  );
};

export default TooltipProvider;
