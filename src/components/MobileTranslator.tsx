import { useState, type ReactNode } from "react";
import TranslatorIcon from "../assets/translator-icon.svg?react";
import HistoryIcon from "../assets/history-icon.svg?react";
import SavedIcon from "../assets/saved-icon.svg?react";
import History from "./History";
import Saved from "./Saved";
import Translator from "./Translator";
import { useAuth } from "../features/auth/useAuth";
import { useLocalization } from "../features/localization/useLocalization";

type Props = {
  selectedTranslation?: {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    createdAt: string;
  } | null;
  setSelectedTranslation: React.Dispatch<
    React.SetStateAction<{
      id: string;
      sourceText: string;
      translatedText: string;
      sourceLanguage: string;
      targetLanguage: string;
      createdAt: string;
    } | null>
  >;
  onHistoryDelete: (id: string) => void;
  onSavedDelete: (id: string) => void;
  className?: string;
};

type Tab = "History" | "Translator" | "Saved";

const tabs: Tab[] = ["History", "Translator", "Saved"];

const MobileTranslator = ({
  selectedTranslation,
  setSelectedTranslation,
  onHistoryDelete,
  onSavedDelete,
  className,
}: Props) => {
  const { currentUser } = useAuth();
  const { currentLocale } = useLocalization();

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  return (
    <div className="w-full h-full flex flex-col flex-1">
      <div
        className={
          "w-[calc(100%+1.75rem)] min-h-10 flex justify-center -m-3.5 -mt-6 mb-4 relative " +
          className
        }
      >
        <TabButton
          icon={<HistoryIcon className="h-5.5" />}
          tabIndex={0}
          currentIndex={currentIndex}
          setIndex={setCurrentIndex}
        />
        <TabButton
          icon={<TranslatorIcon className="h-5.5" />}
          tabIndex={1}
          currentIndex={currentIndex}
          setIndex={setCurrentIndex}
        />
        <TabButton
          icon={<SavedIcon className="h-5.5" />}
          tabIndex={2}
          currentIndex={currentIndex}
          setIndex={setCurrentIndex}
        />
        <span
          style={{
            width: `${(1 / tabs.length) * 100}%`,
            left: `${(currentIndex / tabs.length) * 100}%`,
            transition: "left ease-out 150ms",
          }}
          className={
            "absolute bottom-0 z-10 h-0.25 bg-border-200/85 dark:bg-border-100/75"
          }
        ></span>
      </div>
      <div className="w-full flex flex-1 overflow-auto">
        {tabs[currentIndex] === "History" ? (
          currentUser ? (
            <History
              onSelect={setSelectedTranslation}
              onDelete={onHistoryDelete}
              type="tab"
            />
          ) : (
            <div
              dir="auto"
              className="opacity-65 text-primary-200 dark:text-primary-dark-200 w-full max-h-32
                overflow-hidden select-text"
            >
              {currentLocale.navigation.noHistoryAccess}
            </div>
          )
        ) : tabs[currentIndex] === "Translator" ? (
          <Translator
            selectedTranslation={selectedTranslation}
            setSelectedTranslation={setSelectedTranslation}
          />
        ) : tabs[currentIndex] === "Saved" ? (
          currentUser ? (
            <Saved
              onSelect={setSelectedTranslation}
              onDelete={onSavedDelete}
              type="tab"
            />
          ) : (
            <div
              dir="auto"
              className="opacity-65 text-primary-200 dark:text-primary-dark-200 w-full"
            >
              {currentLocale.navigation.noSavedAccess}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

const TabButton = ({
  icon,
  tabIndex,
  currentIndex,
  setIndex,
}: {
  icon?: ReactNode;
  tabIndex: number;
  currentIndex: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <button
      key={tabIndex}
      onFocus={(e) => e.target.click()}
      onClick={() => setIndex(tabIndex)}
      className={`select-none flex flex-1 justify-center items-center h-full border-b-1
        border-border-200/25 dark:border-border-100/25
        ${tabs[tabIndex] === tabs[currentIndex] ? "bg-transparent inset-shadow-amber-800" : "bg-background-300/56 dark:bg-background-dark-400/30"}
        transition-colors duration-350 ease-out outline-none`}
    >
      {icon ? icon : tabs[tabIndex]}
    </button>
  );
};

export default MobileTranslator;
