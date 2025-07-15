import SavedIcon from "../assets/saved-icon.svg?react";
import SavedItemIcon from "../assets/saved-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import { useLocalization } from "../features/localization/useLocalization";
import SidePanel from "./SidePanel";

//TODO: Display date of each translation
const Saved = ({
  onSelect,
  onDelete,
}: {
  onSelect: (item: {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    createdAt: string;
  }) => void;
  onDelete: (id: string) => void;
}) => {
  const { currentLocale } = useLocalization();
  const { savedTranslations } = useFirestore();
  return (
    <>
      <SidePanel
        label={currentLocale.navigation.saved}
        icon={<SavedIcon />}
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
    </>
  );
};

export default Saved;
