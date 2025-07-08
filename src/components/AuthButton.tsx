import type { Ref } from "react";

type Props = {
  label: string;
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
};

const AuthButton = ({ label, onClick, ref }: Props) => {
  return (
    <button
      ref={ref}
      className="ring-1 ring-transparent focus:ring-secondary-300
        dark:focus:ring-secondary-dark-300 w-18 h-9 text-sm pl-2 pr-2 cursor-pointer
        rounded-3xl bg-secondary-100 dark:bg-secondary-dark-100 text-white
        dark:text-black transition-all duration-180 outline-none hover:bg-secondary-200
        dark:hover:bg-secondary-dark-200 focus-visible:bg-secondary-200
        dark:focus-visible:bg-secondary-dark-200 active:bg-secondary-300
        dark:active:bg-secondary-dark-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AuthButton;
