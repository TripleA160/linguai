import type { Ref } from "react";
import DeleteIcon from "../assets/delete-icon.svg?react";
import { useTooltip } from "../features/tooltip/useTooltip";
import { useLocalization } from "../features/localization/useLocalization";

type Props = {
  accessibilityLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
};

const DeleteButton = ({ accessibilityLabel, onClick, ref }: Props) => {
  const { currentLocale } = useLocalization();
  const tooltip = useTooltip();
  return (
    <button
      ref={ref}
      className="w-7 p-1 cursor-pointer bg-transparent text-secondary-200
        dark:text-secondary-dark-200
        [transition:color_200ms_cubic-bezier(.15,.55,.75,.85)] outline-none
        hover:text-red-600 focus-visible:text-red-600 active:text-red-700"
      aria-label={accessibilityLabel ? accessibilityLabel : "Delete"}
      onClick={onClick}
      onMouseEnter={() => {
        tooltip.changeText(currentLocale.navigation.delete);
        tooltip.showTooltip(500);
      }}
      onMouseLeave={() => tooltip.hideTooltip()}
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
