import { useLocalization } from "../features/localization/useLocalization";
import { useTextSize } from "../features/text-size/useTextSize";
import PlusIcon from "../assets/plus-icon.svg?react";
import MinusIcon from "../assets/minus-icon.svg?react";
import { useTooltip } from "../features/tooltip/useTooltip";

type Props = {
  controlsWidth?: string;
};

const TextSizeSettings = ({ controlsWidth }: Props) => {
  const textSize = useTextSize();
  const tooltip = useTooltip();
  const { currentLanguage, currentLocale } = useLocalization();

  const reduce = () => {
    if (textSize.currentSize <= 1) return;
    textSize.changeSize(textSize.currentSize - 1);
    tooltip.hideTooltip();
  };
  const increase = () => {
    if (textSize.currentSize >= 4) return;
    textSize.changeSize(textSize.currentSize + 1);
    tooltip.hideTooltip();
  };

  return (
    <div
      className={`no-hamburger-follow flex items-center justify-between w-full text-sm
        ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
    >
      <div dir="auto" className="text-primary-100 dark:text-primary-dark-100">
        {currentLocale.settings.textSize}:
      </div>
      <div
        style={{ width: controlsWidth ? controlsWidth : "60%" }}
        className={`flex justify-between items-center gap-2
          ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}`}
      >
        <button
          onClick={reduce}
          onMouseEnter={() => {
            tooltip.showTooltip(
              400,
              "sm",
              currentLocale.settings.textSizeReduce,
            );
          }}
          onMouseLeave={() => tooltip.hideTooltip()}
          aria-label={currentLocale.settings.textSizeReduce}
          className="outline-none cursor-pointer p-2 rounded-full bg-transparent
            hover:bg-secondary-200/20 hover:dark:bg-secondary-dark-200/20
            active:bg-secondary-300/20 active:dark:bg-secondary-dark-300/20
            text-secondary-100 dark:text-secondary-dark-100 active:text-secondary-300
            active:dark:text-secondary-dark-300 transition-colors duration-180"
        >
          <MinusIcon className="w-3 h-3" />
        </button>
        <div className="text-base text-primary-100 dark:text-primary-dark-100">
          {textSize.currentSize}
        </div>
        <button
          onClick={increase}
          onMouseEnter={() => {
            tooltip.showTooltip(
              400,
              "sm",
              currentLocale.settings.textSizeIncrease,
            );
          }}
          onMouseLeave={() => tooltip.hideTooltip()}
          aria-label={currentLocale.settings.textSizeIncrease}
          className="outline-none cursor-pointer p-2 rounded-full bg-transparent
            hover:bg-secondary-200/20 hover:dark:bg-secondary-dark-200/20
            active:bg-secondary-300/20 active:dark:bg-secondary-dark-300/20
            text-secondary-100 dark:text-secondary-dark-100 active:text-secondary-300
            active:dark:text-secondary-dark-300 transition-colors duration-180"
        >
          <PlusIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default TextSizeSettings;
