import { useEffect, useState } from "react";
import { useTooltip } from "../features/tooltip/useTooltip";
import { useLocalization } from "../features/localization/useLocalization";
import { useTheme } from "../features/theme/useTheme";

type Props = {
  onTurnOff?: () => void;
  onTurnOn?: () => void;
};

const AutoThemeButton = ({ onTurnOff, onTurnOn }: Props) => {
  const tooltip = useTooltip();
  const { currentTheme, setAutoTheme, setLightTheme, setDarkTheme } =
    useTheme();
  const { currentLocale } = useLocalization();
  const [isOn, setIsOn] = useState<boolean>(false);

  const turnOff = () => {
    if (document.documentElement.classList.contains("dark")) setDarkTheme();
    else setLightTheme();
    onTurnOff?.();
    setIsOn(false);
    tooltip.hideTooltip();
  };

  const turnOn = () => {
    setAutoTheme();
    onTurnOn?.();
    setIsOn(true);
    tooltip.hideTooltip();
  };

  const toggle = () => {
    if (isOn) turnOff();
    else turnOn();
  };

  useEffect(() => {
    if (currentTheme === "auto") setIsOn(true);
    else setIsOn(false);
  }, [currentTheme]);

  return (
    <button
      onClick={toggle}
      className={`no-hamburger-follow group cursor-pointer select-none w-12 transition-all
        duration-180 ${isOn ? "opacity-100" : "opacity-45"} flex relative flex-1 h-7
        items-center justify-center text-primary-100 dark:text-primary-dark-100 border
        border-secondary-100 bg-background-100 dark:bg-background-dark-400
        dark:border-secondary-dark-100 rounded-full outline-none
        hover:border-secondary-200 dark:hover:border-secondary-dark-200
        focus-visible:border-secondary-200 dark:focus-visible:border-secondary-dark-200
        active:border-secondary-300 dark:active:border-secondary-dark-300`}
      aria-label={currentLocale.settings.toggleAuto}
      onMouseEnter={() => {
        tooltip.showTooltip(400, "sm", currentLocale.settings.toggleAuto);
      }}
      onMouseLeave={() => tooltip.hideTooltip()}
    >
      {currentLocale.settings.auto}
    </button>
  );
};

export default AutoThemeButton;
