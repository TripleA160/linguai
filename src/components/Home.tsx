import { useState } from "react";
import History from "./History";
import Saved from "./Saved";
import Translator from "./Translator";
import { useFirestore } from "../features/firestore/useFirestore";

const Home = () => {
  const [selectedTranslation, setSelectedTranslation] = useState<{
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  } | null>(null);
  const { deleteTranslationFromUserHistory, deleteTranslationFromUserSaved } =
    useFirestore();

  const deleteFromHistory = (id: string) => {
    if (selectedTranslation && selectedTranslation.id === id)
      setSelectedTranslation(null);
    deleteTranslationFromUserHistory(id);
  };
  const deleteFromSaved = (id: string) => {
    if (selectedTranslation && selectedTranslation.id === id)
      setSelectedTranslation(null);
    deleteTranslationFromUserSaved(id);
  };
  return (
    <>
      <div className="flex flex-1 gap-3 overflow-hidden">
        <History
          onSelect={setSelectedTranslation}
          onDelete={deleteFromHistory}
        />
        <Translator
          selectedTranslation={selectedTranslation}
          setSelectedTranslation={setSelectedTranslation}
        />
        <Saved onSelect={setSelectedTranslation} onDelete={deleteFromSaved} />
      </div>
    </>
  );
};

export default Home;
