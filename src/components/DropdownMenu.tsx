//TODO: improve dropdown and add transition effects

import type { ReactNode, Ref } from "react";

type Props = {
  label?: string;
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
};

const DropdownMenu = ({ label, ref, className, children }: Props) => {
  return (
    <div
      ref={ref}
      className={
        `border text-sm text-primary-100 dark:text-primary-dark-100 border-border-100
        dark:border-border-200 absolute top-[calc(100%+0.5rem)] rounded-xl hidden
        flex-col justify-center items-center shadow-md bg-background-100
        dark:bg-background-dark-200 p-2 gap-2 min-w-40 ` + className
      }
    >
      {label && <div>{label}</div>}
      <div className="w-full flex flex-col justify-center items-center gap-2">
        {children}
      </div>
    </div>
  );
};

export default DropdownMenu;
