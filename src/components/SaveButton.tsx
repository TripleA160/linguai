import SaveIcon from "../assets/save-icon.svg?react";
import type { Ref } from "react";
import { useLocalization } from "../features/localization/useLocalization";
import { useTooltip } from "../features/tooltip/useTooltip";

type Props = {
  accessibilityLabel?: string;
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
  isSaved?: boolean;
};

const SaveButton = ({ accessibilityLabel, onClick, ref, isSaved }: Props) => {
  const { currentLocale } = useLocalization();
  const tooltip = useTooltip();

  return (
    <>
      <button
        ref={ref}
        onClick={() => {
          if (onClick) onClick();
          tooltip.hideTooltip();
        }}
        className="group cursor-pointer w-6 h-6 text-secondary-100 transition-all duration-180
          outline-none hover:text-secondary-200 focus:text-secondary-200
          active:text-secondary-300"
        aria-label={
          accessibilityLabel
            ? accessibilityLabel
            : currentLocale.translator.save
        }
        onMouseEnter={() => {
          tooltip.showTooltip(
            400,
            "sm",
            accessibilityLabel || currentLocale.translator.save,
          );
        }}
        onMouseLeave={() => tooltip.hideTooltip()}
      >
        <SaveIcon
          className={`transition-all duration-180 ${
            isSaved
              ? "stroke-[url(#gradientSB)] fill-[url(#gradientSB)]"
              : `stroke-secondary-100 fill-transparent group-hover:stroke-secondary-200
                group-hover:fill-secondary-200 group-focus:stroke-secondary-200
                group-active:stroke-secondary-300 group-active:fill-secondary-300`
            }`}
        />
      </button>
    </>
  );
};

export default SaveButton;
