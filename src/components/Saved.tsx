import SavedIcon from "../assets/saved-icon.svg?react";
import SavedItemIcon from "../assets/saved-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import { useLocalization } from "../features/localization/useLocalization";
import SidePanel from "./SidePanel";

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
  className?: string;
};

const Saved = ({ onSelect, onDelete, className }: Props) => {
  const { currentLocale } = useLocalization();
  const { savedTranslations } = useFirestore();
  return (
    <>
      <SidePanel
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
    </>
  );
};

export default Saved;
