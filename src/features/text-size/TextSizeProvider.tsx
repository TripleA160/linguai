import { useEffect, useState, type ReactNode } from "react";
import type { TextSizeContextData } from "../../types/text-size-types";
import { TextSizeContext } from "./TextSizeContext";

const TextSizeProvider = ({ children }: { children: ReactNode }) => {
  const [currentSize, setCurrentSize] = useState<number>(2);

  const changeSize = (size: number, saveSize: boolean = true) => {
    const xs = 0.75 + (size - 2) * 0.125;
    const sm = 0.875 + (size - 2) * 0.125;
    const base = 1 + (size - 2) * 0.125;
    const lg = 1.125 + (size - 2) * 0.125;
    const xl = 1.25 + (size - 2) * 0.125;
    const xxl = 1.5 + (size - 2) * 0.125;
    const xxxl = 1.875 + (size - 2) * 0.125;

    document.documentElement.style.setProperty("--text-xs", xs + "rem");
    document.documentElement.style.setProperty("--text-sm", sm + "rem");
    document.documentElement.style.setProperty("--text-base", base + "rem");
    document.documentElement.style.setProperty("--text-lg", lg + "rem");
    document.documentElement.style.setProperty("--text-xl", xl + "rem");
    document.documentElement.style.setProperty("--text-2xl", xxl + "rem");
    document.documentElement.style.setProperty("--text-3xl", xxxl + "rem");

    setCurrentSize(size);

    if (saveSize) localStorage.setItem("text-size", size.toString());
  };

  useEffect(() => {
    const savedSize = localStorage.getItem("text-size");

    if (!savedSize) {
      changeSize(2);
      return;
    }

    const parsedSize = parseInt(savedSize);

    if (parsedSize) changeSize(parsedSize);
  }, []);

  const contextData: TextSizeContextData = {
    currentSize,
    changeSize,
  };
  return (
    <TextSizeContext.Provider value={contextData}>
      {children}
    </TextSizeContext.Provider>
  );
};

export default TextSizeProvider;
