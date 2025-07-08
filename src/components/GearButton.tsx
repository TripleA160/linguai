import type { Ref } from "react";
import SettingsIcon from "../assets/settings-icon.svg?react";

type Props = {
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
};

const GearButton = ({ onClick, ref }: Props) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="cursor-pointer w-8 h-8 text-secondary-100 dark:text-secondary-dark-100
        transition-all duration-180 outline-none group-hover:text-secondary-200
        dark:group-hover:text-secondary-dark-200 hover:text-secondary-200
        dark:hover:text-secondary-dark-200 focus-visible:text-secondary-200
        dark:focus-visible:text-secondary-dark-200
        group-focus-visible:text-secondary-200
        dark:group-focus-visible:text-secondary-dark-200 focus:text-secondary-200
        dark:focus:text-secondary-dark-200 active:text-secondary-300
        dark:active:text-secondary-dark-300 group-active:text-secondary-300
        dark:group-active:text-secondary-dark-300"
    >
      <SettingsIcon className="w-full h-full" />
    </button>
  );
};

export default GearButton;
