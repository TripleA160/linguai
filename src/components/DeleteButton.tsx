import type { Ref } from "react";
import DeleteIcon from "../assets/delete-icon.svg?react";
import { useTooltip } from "../features/tooltip/useTooltip";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
};

const DeleteButton = ({ onClick, ref }: Props) => {
  const tooltip = useTooltip();
  return (
    <button
      ref={ref}
      className="w-7 p-1 cursor-pointer bg-transparent text-secondary-200
        dark:text-secondary-dark-200 transition-all duration-180 outline-none
        hover:text-red-600 focus-visible:text-red-600 active:text-red-700"
      onClick={onClick}
      onMouseEnter={() => {
        tooltip.changeText("Delete");
        tooltip.showTooltip(500);
      }}
      onMouseLeave={() => tooltip.hideTooltip()}
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
