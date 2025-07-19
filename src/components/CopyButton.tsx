import CopyIcon from "../assets/copy-icon.svg?react";
import CopiedIcon from "../assets/copied-icon.svg?react";
import { useState, type MouseEvent, type Ref } from "react";
import { useLocalization } from "../features/localization/useLocalization";
import { useTooltip } from "../features/tooltip/useTooltip";

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
  const { currentLocale } = useLocalization();
  const tooltip = useTooltip();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    tooltip.changeText(currentLocale.translator.copied);
    setTimeout(() => {
      setIsCopied(false);
      tooltip.changeText(currentLocale.translator.copy);
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
        aria-label={
          accessibilityLabel
            ? accessibilityLabel
            : currentLocale.translator.copy
        }
        onMouseEnter={() => {
          tooltip.showTooltip(
            400,
            "sm",
            isCopied
              ? currentLocale.translator.copied
              : currentLocale.translator.copy,
          );
        }}
        onMouseLeave={() => tooltip.hideTooltip()}
      >
        {isCopied ? <CopiedIcon /> : <CopyIcon />}
      </button>
    </>
  );
};

export default CopyButton;
