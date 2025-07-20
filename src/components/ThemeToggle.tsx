import { useEffect, useState } from "react";
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

  const turnOff = () => {
    setLightTheme();
    onTurnOff?.();
    setIsOn(false);
    tooltip.hideTooltip();
  };

  const turnOn = () => {
    setDarkTheme();
    onTurnOn?.();
    setIsOn(true);
    tooltip.hideTooltip();
  };

  const toggle = () => {
    if (isOn) turnOff();
    else turnOn();
  };

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) setIsOn(true);
    else setIsOn(false);
  }, [currentTheme]);

  return (
    <button
      onClick={toggle}
      className={`group cursor-pointer w-18 transition-all duration-180
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
      <div className={"w-full"}>
        {isOn ? currentLocale.settings.dark : currentLocale.settings.light}
      </div>
      <div
        className={`w-5 h-5 absolute transition-all duration-180
          ${isOn ? "left-[calc(100%-1.5rem)]" : "left-1"} bg-secondary-100
          dark:bg-secondary-dark-100 group-hover:bg-secondary-200
          dark:group-hover:bg-secondary-dark-200 group-focus-visible:bg-secondary-200
          dark:group-focus-visible:bg-secondary-dark-200 group-active:bg-secondary-300
          dark:group-active:bg-secondary-dark-300 rounded-full`}
      ></div>
    </button>
  );
};

export default ThemeToggle;
