import CopyIcon from "../assets/copy-icon.svg?react";
import CopiedIcon from "../assets/copied-icon.svg?react";
import { useState, type MouseEvent, type Ref } from "react";

type Props = {
  textToCopy: string;
  accessibilityLabel?: string;
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
};

const CopyButton = ({
  textToCopy,
  accessibilityLabel,
  onClick,
  ref,
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    e.currentTarget.blur();

    if (onClick) onClick();
  };

  return (
    <>
      <button
        ref={ref}
        onClick={handleCopy}
        className={`group cursor-pointer w-5.5 h-5.5 ${
          isCopied
            ? "text-secondary-200"
            : `text-secondary-100 transition-all duration-180 outline-none
              hover:text-secondary-200 focus:text-secondary-200 active:text-secondary-300`
          }`}
        aria-label={accessibilityLabel ? accessibilityLabel : "Copy"}
      >
        {isCopied ? <CopiedIcon /> : <CopyIcon />}
      </button>
    </>
  );
};

export default CopyButton;
