import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useLocalization } from "../features/localization/useLocalization";

const HamburgerButton = ({
  className,
  onOpen,
  onClose,
}: {
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
}) => {
  const { currentLocale } = useLocalization();

  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const open = () => {
    setIsOpen(true);
    onOpen?.();
  };

  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  const toggle = () => {
    if (isOpen) close();
    else open();
  };

  const hide = () => {
    setIsHidden(true);
  };
  const show = () => {
    setIsHidden(false);
  };

  return (
    <div className={"flex " + className}>
      <button
        onClick={toggle}
        className={`group w-6 h-6 relative flex items-center justify-center z-150 outline-none
          transition-opacity duration-150
          ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label={currentLocale.navigation.openMenu}
      >
        <span
          className={`block absolute h-0.5 w-6 bg-secondary-100 dark:bg-secondary-dark-100
            group-hover:bg-secondary-200 dark:group-hover:bg-secondary-dark-200
            group-active:bg-secondary-300 dark:group-active:bg-secondary-dark-300 transform
            transition duration-280 ease-in-out will-change-transform
            ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
        />
        <span
          className={`block absolute h-0.5 w-6 bg-secondary-100 dark:bg-secondary-dark-100
            group-hover:bg-secondary-200 dark:group-hover:bg-secondary-dark-200
            group-active:bg-secondary-300 dark:group-active:bg-secondary-dark-300
            transition-all duration-280 ease-in-out will-change-transform ${
            isOpen ? "opacity-0 scale-x-0" : "opacity-100" }`}
        />
        <span
          className={`block absolute h-0.5 w-6 bg-secondary-100 dark:bg-secondary-dark-100
            group-hover:bg-secondary-200 dark:group-hover:bg-secondary-dark-200
            group-active:bg-secondary-300 dark:group-active:bg-secondary-dark-300 transform
            transition duration-280 ease-in-out will-change-transform
            ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
        />
      </button>
      <HamburgerMenu
        isOpen={isOpen}
        onClose={close}
        onHold={hide}
        onRelease={show}
      />
    </div>
  );
};

export default HamburgerButton;
