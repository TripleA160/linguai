import { useRef, type ReactNode } from "react";

type Props = {
  label: string | ReactNode;
  accessibilityLabel?: string;
  onClick?: () => void;
  className?: string;
  isCollapsible?: boolean;
  collapseLabel?: string | ReactNode;
};

const AuthButton = ({
  label,
  accessibilityLabel,
  onClick,
  className,
  isCollapsible,
  collapseLabel,
}: Props) => {
  const containerRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={containerRef}
      className={
        `group outline-1 focus:shadow-button outline-transparent
        focus:outline-primary-200 dark:focus:outline-primary-dark-200 h-9 text-sm pl-2
        pr-2 whitespace-nowrap cursor-pointer rounded-3xl bg-secondary-100
        dark:bg-secondary-dark-100 text-white dark:text-black transition-all
        duration-180 hover:bg-secondary-200 dark:hover:bg-secondary-dark-200
        focus-visible:bg-secondary-200 dark:focus-visible:bg-secondary-dark-200
        active:bg-secondary-300 dark:active:bg-secondary-dark-300 ` + className
      }
      onClick={onClick}
      aria-label={
        accessibilityLabel
          ? accessibilityLabel
          : typeof label === "string"
            ? label
            : undefined
      }
    >
      {isCollapsible ? (
        <span className="flex items-center justify-center">
          <span className="block">{collapseLabel || label}</span>
          <span
            className="overflow-hidden opacity-0 max-w-0 min-w-0 group-hover:opacity-100
              translate-x-1.5 group-hover:max-w-28 group-hover:min-w-12 group-hover:pr-1.5
              transition-all duration-200 leading-snug"
          >
            {label}
          </span>
        </span>
      ) : (
        <span className="flex items-center justify-center min-w-24">
          {label}
        </span>
      )}
    </button>
  );
};

export default AuthButton;
