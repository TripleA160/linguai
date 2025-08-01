import random from "lodash/random";
import HistoryIcon from "../assets/history-icon.svg?react";
import HistoryItemIcon from "../assets/history-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import { useLocalization } from "../features/localization/useLocalization";
import SidePanel from "./SidePanel";
import DeleteButton from "./DeleteButton";
import { useAuth } from "../features/auth/useAuth";

type Props = {
  onSelect: (item: {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    createdAt: string;
  }) => void;
  onDelete: (id: string) => void;
  afterSelect?: () => void;
  type?: "side-panel" | "tab";
  className?: string;
};

const History = ({
  onSelect,
  onDelete,
  afterSelect,
  type = "side-panel",
  className,
}: Props) => {
  const { currentUser } = useAuth();
  const { currentLocale } = useLocalization();
  const { translationHistory } = useFirestore();

  return (
    <>
      {type === "side-panel" ? (
        <SidePanel
          privateAccess={true}
          notAccessText={currentLocale.navigation.noHistoryAccess}
          label={currentLocale.navigation.history}
          icon={<HistoryIcon />}
          className={className}
          items={translationHistory?.map((translation) => {
            const createdAt = translation.createdAt.toDate().toLocaleString();
            return {
              id: translation.id,
              icon: <HistoryItemIcon />,
              text: translation.translatedText,
              additionalText: createdAt,
              onSelect: () => {
                onSelect({
                  id: translation.id,
                  sourceText: translation.sourceText,
                  translatedText: translation.translatedText,
                  sourceLanguage: translation.sourceLanguage,
                  targetLanguage: translation.targetLanguage,
                  createdAt: createdAt,
                });
                if (afterSelect) afterSelect();
              },
              onDelete: () => onDelete(translation.id),
            };
          })}
        />
      ) : (
        <div
          className={
            "flex flex-col items-center gap-2 w-full overflow-y-auto overflow-x-hidden " +
            className
          }
        >
          {currentUser ? (
            translationHistory?.map((translation) => {
              const createdAt = translation.createdAt.toDate().toLocaleString();
              return (
                <div
                  key={translation.id || translation.translatedText + random()}
                  className="w-full group flex flex-col items-center"
                >
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect({
                        id: translation.id,
                        sourceText: translation.sourceText,
                        translatedText: translation.translatedText,
                        sourceLanguage: translation.sourceLanguage,
                        targetLanguage: translation.targetLanguage,
                        createdAt: createdAt,
                      });
                      if (afterSelect) afterSelect();
                    }}
                    className={`group flex items-center w-full gap-1.5 bg-background-200
                      dark:bg-background-dark-200 rounded-t-md cursor-pointer hover:bg-background-300
                      dark:hover:bg-background-dark-100 group-hover:bg-background-300
                      dark:group-hover:bg-background-dark-100 active:bg-background-300
                      dark:active:bg-background-dark-100 group-active:bg-background-300
                      dark:group-active:bg-background-dark-100
                      [transition:colors_125ms_cubic-bezier(.1,.55,.75,.85)]`}
                  >
                    <div
                      className="w-7 shrink-0 text-secondary-100 opacity-70 hover:opacity-100
                        group-hover:opacity-100 active:opacity-100 group-active:opacity-100
                        [transition:opacity_125ms_cubic-bezier(.1,.55,.75,.85)]"
                    >
                      <HistoryItemIcon />
                    </div>

                    <div
                      dir="auto"
                      className="text-sm text-primary-200 dark:text-primary-dark-200 truncate w-full pr-1.5
                        select-text"
                    >
                      {translation.translatedText}
                    </div>
                    <DeleteButton
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        onDelete(translation.id);
                      }}
                    />
                  </div>
                  <div
                    dir="auto"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect({
                        id: translation.id,
                        sourceText: translation.sourceText,
                        translatedText: translation.translatedText,
                        sourceLanguage: translation.sourceLanguage,
                        targetLanguage: translation.targetLanguage,
                        createdAt: createdAt,
                      });
                    }}
                    className="cursor-pointer text-xs p-0.25 bg-background-300 dark:bg-background-dark-200
                      text-secondary-100 dark:text-secondary-dark-200 hover:text-secondary-300
                      dark:hover:text-secondary-dark-100 rounded-b-md inset-shadow-[0_3px_3px_#000]/10
                      dark:inset-shadow-[0_3px_3px_#000]/10 group-hover:text-secondary-300
                      dark:group-hover:text-secondary-dark-100 active:text-secondary-300
                      dark:active:text-secondary-dark-100 group-active:text-secondary-300
                      dark:group-active:text-secondary-dark-100
                      [transition:color_125ms_cubic-bezier(.1,.55,.75,.85)_0s,_opacity_125ms_cubic-bezier(.1,.55,.75,.85)_0s,_max-height_250ms_cubic-bezier(0.4,0,0.2,1)_25ms]
                      overflow-hidden select-text w-full text-center opacity-85 max-h-5
                      hover:opacity-95 group-hover:opacity-95"
                  >
                    {createdAt}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="opacity-65 text-base text-primary-200 dark:text-primary-dark-200 w-full max-h-32
                overflow-hidden select-text"
            >
              {currentLocale.navigation.noHistoryAccess}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default History;
