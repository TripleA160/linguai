import HistoryIcon from "../assets/history-icon.svg?react";
import HistoryItemIcon from "../assets/history-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import SidePanel from "./SidePanel";

//TODO: Display date of each translation
//TODO: Add delete button
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
  const { translationHistory } = useFirestore();
  return (
    <>
      <SidePanel
        label="History"
        icon={<HistoryIcon />}
        items={translationHistory?.map((item) => ({
          id: item.id,
          icon: <HistoryItemIcon />,
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

export default History;
