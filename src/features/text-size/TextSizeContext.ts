import { createContext } from "react";
import type { TextSizeContextData } from "../../types/text-size-types";

export const TextSizeContext = createContext<TextSizeContextData>({
  currentSize: 3,
  changeSize: () => {},
});
