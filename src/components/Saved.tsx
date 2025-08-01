import random from "lodash/random";
import SavedIcon from "../assets/saved-icon.svg?react";
import SavedItemIcon from "../assets/saved-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import { useLocalization } from "../features/localization/useLocalization";
import SidePanel from "./SidePanel";
import DeleteButton from "./DeleteButton";

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
  type?: "side-panel" | "tab";
  className?: string;
};

const Saved = ({
  onSelect,
  onDelete,
  type = "side-panel",
  className,
}: Props) => {
  const { currentLocale } = useLocalization();
  const { savedTranslations } = useFirestore();
  return (
    <>
      {type === "side-panel" ? (
        <SidePanel
          privateAccess={true}
          notAccessText={currentLocale.navigation.noSavedAccess}
          label={currentLocale.navigation.saved}
          icon={<SavedIcon />}
          className={className}
          items={savedTranslations?.map((translation) => {
            const createdAt = translation.createdAt.toDate().toLocaleString();
            return {
              id: translation.id,
              icon: <SavedItemIcon />,
              text: translation.translatedText,
              additionalText: createdAt,
              onSelect: () =>
                onSelect({
                  id: translation.id,
                  sourceText: translation.sourceText,
                  translatedText: translation.translatedText,
                  sourceLanguage: translation.sourceLanguage,
                  targetLanguage: translation.targetLanguage,
                  createdAt: createdAt,
                }),
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
          {savedTranslations?.map((translation) => {
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
                  }}
                  className={`group flex items-center w-full gap-1.5 bg-background-200
                    dark:bg-background-dark-200 rounded-md cursor-pointer hover:bg-background-300
                    dark:hover:bg-background-dark-100 group-hover:bg-background-300
                    dark:group-hover:bg-background-dark-100
                    [transition:colors_125ms_cubic-bezier(.1,.55,.75,.85)]`}
                >
                  <div
                    className="w-7 shrink-0 text-secondary-100 opacity-70 hover:opacity-100
                      group-hover:opacity-100 [transition:opacity_125ms_cubic-bezier(.1,.55,.75,.85)]"
                  >
                    <SavedItemIcon />
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
                    dark:group-hover:text-secondary-dark-100
                    [transition:color_125ms_cubic-bezier(.1,.55,.75,.85)_0s,_opacity_125ms_cubic-bezier(.1,.55,.75,.85)_0s,_max-height_250ms_cubic-bezier(0.4,0,0.2,1)_25ms]
                    overflow-hidden select-text w-full text-center opacity-85 max-h-5
                    hover:opacity-95 group-hover:opacity-95"
                >
                  {createdAt}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Saved;
