import SwitchIcon from "../assets/switch-icon.svg?react";
import type { Ref } from "react";

type Props = {
  accessibilityLabel?: string;
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
};

const SwitchButton = ({ accessibilityLabel, onClick, ref }: Props) => {
  return (
    <>
      <button
        ref={ref}
        onClick={onClick}
        className="focus:drop-shadow-button-2 cursor-pointer w-9 h-9 text-secondary-100
          dark:text-secondary-dark-100 transition-all duration-180 outline-none
          hover:text-secondary-200 dark:hover:text-secondary-dark-200
          focus-visible:text-secondary-200 dark:focus-visible:text-secondary-dark-200
          active:text-secondary-300 dark:active:text-secondary-dark-300"
        aria-label={
          accessibilityLabel ? accessibilityLabel : "Switch languages"
        }
      >
        <SwitchIcon />
      </button>
    </>
  );
};

export default SwitchButton;
