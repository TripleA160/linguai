import SaveIcon from "../assets/save-icon.svg?react";
import type { Ref, RefObject } from "react";

type Props = {
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
  isSaved?: RefObject<boolean>;
};

const SaveButton = ({ onClick, ref, isSaved }: Props) => {
  return (
    <>
      <button
        ref={ref}
        onClick={onClick}
        className="group cursor-pointer w-6 h-6 text-secondary-100 transition-all duration-180
          outline-none hover:text-secondary-200 focus:text-secondary-200
          active:text-secondary-300"
      >
        <SaveIcon
          className={`transition-all duration-180 ${
            isSaved?.current
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
