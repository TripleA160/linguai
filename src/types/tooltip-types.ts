export type TooltipContextData = {
  currentText: string | null;
  isVisible: boolean;
  changeText: (text: string | null) => void;
  hideTooltip: () => void;
  showTooltip: (
    delay?: number,
    size?: "sm" | "md" | "lg",
    text?: string,
  ) => void;
  toggleTooltip: () => void;
  move: (x?: number, y?: number) => void;
};
