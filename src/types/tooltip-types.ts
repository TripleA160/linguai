export type TooltipContextData = {
  currentText: string | null;
  isVisible: boolean;
  changeText: (text: string | null) => void;
  hideTooltip: () => void;
  showTooltip: (delay?: number) => void;
  toggleTooltip: () => void;
  move: (x?: number, y?: number) => void;
};
