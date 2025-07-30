import { useEffect, useRef, useState } from "react";
import { useTooltip } from "../features/tooltip/useTooltip";
import { useTheme } from "../features/theme/useTheme";
import { useLocalization } from "../features/localization/useLocalization";

type Props = {
  onTurnOff?: () => void;
  onTurnOn?: () => void;
};

const ThemeToggle = ({ onTurnOff, onTurnOn }: Props) => {
  const tooltip = useTooltip();
  const { currentLocale } = useLocalization();
  const { currentTheme, setLightTheme, setDarkTheme } = useTheme();
  const [isOn, setIsOn] = useState<boolean>(false);
  const isOnRef = useRef<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [dotPosition, setDotPosition] = useState<number>(0);
  const [shouldFollow, setShouldFollow] = useState<boolean>(false);
  const shouldFollowRef = useRef<boolean>(false);

  const turnOff = () => {
    setLightTheme();
    onTurnOff?.();
    setIsOn(false);
    isOnRef.current = false;
    tooltip.hideTooltip();
  };

  const turnOn = () => {
    setDarkTheme();
    onTurnOn?.();
    setIsOn(true);
    isOnRef.current = true;
    tooltip.hideTooltip();
  };

  const toggle = () => {
    if (isOn) turnOff();
    else turnOn();
  };

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsOn(true);
      isOnRef.current = true;
    } else {
      setIsOn(false);
      isOnRef.current = false;
    }
  }, [currentTheme]);

  useEffect(() => {
    const toggle = toggleRef.current;
    const dot = dotRef.current;

    if (!toggle || !dot) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current) return;

      const touchCurrentX = e.changedTouches[0].clientX;
      const xDiff = touchCurrentX - touchStartX.current;

      if (!shouldFollowRef.current && Math.abs(xDiff) > 8) {
        setShouldFollow(true);
        shouldFollowRef.current = true;
      }

      if (shouldFollowRef.current) {
        const base = isOnRef.current
          ? toggle.clientWidth - dot.clientWidth - 4
          : 4;

        const clampedX = Math.max(
          4,
          Math.min(base + xDiff, toggle.clientWidth - dot.clientWidth - 4),
        );
        setDotPosition(clampedX);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX.current) return;

      if (!shouldFollowRef.current) {
        touchStartX.current = null;
        return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const xDiff = touchEndX - touchStartX.current;

      if (xDiff > 16) {
        turnOn();
      } else if (xDiff < -16) {
        turnOff();
      }

      touchStartX.current = null;
      setShouldFollow(false);
      shouldFollowRef.current = false;
    };

    toggle.addEventListener("touchstart", handleTouchStart);
    toggle.addEventListener("touchmove", handleTouchMove);
    toggle.addEventListener("touchend", handleTouchEnd);

    return () => {
      toggle.removeEventListener("touchstart", handleTouchStart);
      toggle.removeEventListener("touchmove", handleTouchMove);
      toggle.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <button
      ref={toggleRef}
      onClick={toggle}
      className={`no-hamburger-follow group cursor-pointer w-18 transition-all duration-180
        ${isOn ? "pl-2 pr-7 " : "pl-7 pr-2 "} flex relative flex-1 h-7 items-center
        justify-center text-primary-100 dark:text-primary-dark-100 border
        border-secondary-100 dark:border-secondary-dark-100 bg-background-100
        dark:bg-background-dark-400 rounded-full outline-none hover:border-secondary-200
        dark:hover:border-secondary-dark-200 focus-visible:border-secondary-200
        dark:focus-visible:border-secondary-dark-200 active:border-secondary-300
        dark:active:border-secondary-dark-300
        ${currentTheme === "auto" ? "opacity-45" : "opacity-100"}`}
      aria-label={currentLocale.settings.toggleTheme}
      onMouseEnter={() => {
        tooltip.showTooltip(400, "sm", currentLocale.settings.toggleTheme);
      }}
      onMouseLeave={() => tooltip.hideTooltip()}
    >
      <div
        className={`no-hamburger-follow w-full ${shouldFollow ? "opacity-0" : "opacity-100"}
          transition-opacity duration-180 select-none`}
      >
        {isOn ? currentLocale.settings.dark : currentLocale.settings.light}
      </div>
      <div
        ref={dotRef}
        style={
          shouldFollow
            ? { left: `${dotPosition}px` }
            : isOn
              ? { left: `calc(100% - 20px - 4px)` }
              : { left: "4px" }
        }
        className={`no-hamburger-follow w-5 h-5 absolute ${
          shouldFollow
            ? "bg-secondary-300 dark:bg-secondary-dark-300"
            : "bg-secondary-100 dark:bg-secondary-dark-100 transition-all duration-180"
          } group-hover:bg-secondary-200 dark:group-hover:bg-secondary-dark-200
          group-focus-visible:bg-secondary-200
          dark:group-focus-visible:bg-secondary-dark-200 group-active:bg-secondary-300
          dark:group-active:bg-secondary-dark-300 rounded-full`}
      ></div>
    </button>
  );
};

export default ThemeToggle;
