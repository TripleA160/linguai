import { useState } from "react";
import History from "./History";
import Saved from "./Saved";
import Translator from "./Translator";

const Home = () => {
  const [selectedTranslation, setSelectedTranslation] = useState<{
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  } | null>(null);

  return (
    <>
      <div className="flex flex-1 gap-3 overflow-hidden">
        <History onSelect={setSelectedTranslation} />
        <Translator
          selectedTranslation={selectedTranslation}
          setSelectedTranslation={setSelectedTranslation}
        />
        <Saved onSelect={setSelectedTranslation} />
      </div>
    </>
  );
};

export default Home;
