import { createContext } from "react";
import { type TooltipContextData } from "../../types/tooltip-types";

export const TooltipContext = createContext<TooltipContextData>({
  currentText: null,
  isVisible: false,
  changeText: () => {},
  hideTooltip: () => {},
  showTooltip: () => {},
  toggleTooltip: () => {},
  move: () => {},
});
