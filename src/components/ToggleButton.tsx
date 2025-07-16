import { useEffect, useState } from "react";
import { useLocalization } from "../features/localization/useLocalization";

type Props = {
  label?: string;
  offText: string;
  onText: string;
  onTurnOff: () => void;
  onTurnOn: () => void;
  check?: boolean;
};

const ToggleButton = ({
  label,
  offText,
  onText,
  onTurnOff,
  onTurnOn,
  check,
}: Props) => {
  const { currentLanguage } = useLocalization();
  const [isOn, setIsOn] = useState<boolean>(false);

  const turnOff = () => {
    onTurnOff?.();
    setIsOn(false);
  };

  const turnOn = () => {
    onTurnOn?.();
    setIsOn(true);
  };

  const toggle = () => {
    if (isOn) turnOff();
    else turnOn();
  };

  useEffect(() => {
    if (check) setIsOn(true);
    else setIsOn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`select-none w-full flex justify-between items-center
        ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
    >
      {label && <div dir="auto">{label}:</div>}
      <button
        onClick={toggle}
        className={`group cursor-pointer w-18 transition-all duration-180
          ${isOn ? "pl-2 pr-7 " : "pl-7 pr-2 "} flex relative h-7 items-center
          justify-center text-primary-100 dark:text-primary-dark-100 border
          border-secondary-100 dark:border-secondary-dark-100 bg-background-100
          dark:bg-background-dark-400 rounded-full outline-none hover:border-secondary-200
          dark:hover:border-secondary-dark-200 focus-visible:border-secondary-200
          dark:focus-visible:border-secondary-dark-200 active:border-secondary-300
          dark:active:border-secondary-dark-300`}
      >
        <div className={"w-full"}>{isOn ? onText : offText}</div>
        <div
          className={`w-5 h-5 absolute transition-all duration-180
            ${isOn ? "left-[calc(100%-1.5rem)]" : "left-1"} bg-secondary-100
            dark:bg-secondary-dark-100 group-hover:bg-secondary-200
            dark:group-hover:bg-secondary-dark-200 group-focus-visible:bg-secondary-200
            dark:group-focus-visible:bg-secondary-dark-200 group-active:bg-secondary-300
            dark:group-active:bg-secondary-dark-300 rounded-full`}
        ></div>
      </button>
    </div>
  );
};

export default ToggleButton;
