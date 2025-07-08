import SavedIcon from "../assets/saved-icon.svg?react";
import SavedItemIcon from "../assets/saved-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import SidePanel from "./SidePanel";

//TODO: Display date of each translation
//TODO: Add delete button
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
  const { savedTranslations } = useFirestore();
  return (
    <>
      <SidePanel
        label="Saved"
        icon={<SavedIcon />}
        items={savedTranslations?.map((item) => ({
          id: item.id,
          icon: <SavedItemIcon />,
          text: item.translatedText,
          onClick: () =>
            onSelect({
              id: item.id,
              sourceText: item.sourceText,
              translatedText: item.translatedText,
              sourceLanguage: item.sourceLanguage,
              targetLanguage: item.targetLanguage,
            }),
        }))}
      />
    </>
  );
};

export default Saved;
