import HistoryIcon from "../assets/history-icon.svg?react";
import HistoryItemIcon from "../assets/history-item-icon.svg?react";
import { useFirestore } from "../features/firestore/useFirestore";
import { useLocalization } from "../features/localization/useLocalization";
import SidePanel from "./SidePanel";

const History = ({
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
  const { translationHistory } = useFirestore();
  return (
    <>
      <SidePanel
        label={currentLocale.navigation.history}
        icon={<HistoryIcon />}
        items={translationHistory?.map((translation) => {
          const createdAt = translation.createdAt.toDate().toLocaleString();
          return {
            id: translation.id,
            icon: <HistoryItemIcon />,
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

export default History;
