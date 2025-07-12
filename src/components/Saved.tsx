import SavedIcon from "../assets/saved-icon.svg?react";
import SavedItemIcon from "../assets/saved-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import SidePanel from "./SidePanel";

//TODO: Display date of each translation
const Saved = ({
  onSelect,
}: {
  onSelect: (item: {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  }) => void;
}) => {
  const { savedTranslations, deleteTranslationFromUserSaved } = useFirestore();
  return (
    <>
      <SidePanel
        label="Saved"
        icon={<SavedIcon />}
        items={savedTranslations?.map((translation) => ({
          id: translation.id,
          icon: <SavedItemIcon />,
          text: translation.translatedText,
          onSelect: () =>
            onSelect({
              id: translation.id,
              sourceText: translation.sourceText,
              translatedText: translation.translatedText,
              sourceLanguage: translation.sourceLanguage,
              targetLanguage: translation.targetLanguage,
            }),
            onDelete: () => deleteTranslationFromUserSaved(translation.id)
        }))}
      />
    </>
  );
};

export default Saved;
