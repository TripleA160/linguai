import HistoryIcon from "../assets/history-icon.svg?react";
import HistoryItemIcon from "../assets/history-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import SidePanel from "./SidePanel";

//TODO: Display date of each translation
const History = ({
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
  const { translationHistory, deleteTranslationFromUserHistory } = useFirestore();
  return (
    <>
      <SidePanel
        label="History"
        icon={<HistoryIcon />}
        items={translationHistory?.map((translation) => ({
          id: translation.id,
          icon: <HistoryItemIcon />,
          text: translation.translatedText,
          onSelect: () =>
            onSelect({
              id: translation.id,
              sourceText: translation.sourceText,
              translatedText: translation.translatedText,
              sourceLanguage: translation.sourceLanguage,
              targetLanguage: translation.targetLanguage,
            }),
          onDelete: () => deleteTranslationFromUserHistory(translation.id)
        }))}
      />
    </>
  );
};

export default History;
