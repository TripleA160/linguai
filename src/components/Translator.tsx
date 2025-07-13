import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useGemini } from "../features/gemini/useGemini";
import { formatAIError } from "../utils/firebase-utils";
import SwitchButton from "./SwitchButton";
import debounce from "lodash/debounce";
import LanguageSelector from "./LanguageSelector";
import { languages, type Language } from "../utils/language-utils";
import SaveButton from "./SaveButton";
import { useFirestore } from "../features/firestore/useFirestore";
import { useAuth } from "../features/auth/useAuth";

type Props = {
  selectedTranslation?: {
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  } | null;
  setSelectedTranslation: React.Dispatch<
    React.SetStateAction<{
      id: string;
      sourceText: string;
      translatedText: string;
      sourceLanguage: string;
      targetLanguage: string;
    } | null>
  >;
};

const Translator = ({ selectedTranslation, setSelectedTranslation }: Props) => {
  const translateInputRef = useRef<HTMLTextAreaElement>(null);
  const translateOutputRef = useRef<HTMLDivElement>(null);
  const delay = useRef<number>(750);
  const isCancelled = useRef<boolean>(false);
  const shouldUpdateTranslation = useRef<boolean>(true);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const [sourceLanguage, setSourceLanguage] = useState<Language>(languages[1]);
  const [targetLanguage, setTargetLanguage] = useState<Language>(languages[0]);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslationSaved, setIsTranslationSaved] = useState<boolean>(false);
  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { translate } = useGemini();
  const { currentUser } = useAuth();

  const {
    initialTranslationHistory,
    translationHistory,
    savedTranslations,
    addTranslationToUserSaved,
    deleteTranslationFromUserSaved,
  } = useFirestore();

  const updateTranslation = useCallback(
    async (text: string) => {
      setIsTranslationSaved(false);
      if (!shouldUpdateTranslation.current || !text || text.trim() === "") {
        setSelectedTranslation(null);
        setTranslatedText("");
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const result = await translate(
          text,
          targetLanguage.name,
          sourceLanguage.name,
          isCancelled,
        );
        if (result) {
          setError(null);
          setTranslatedText(result);
        }
      } catch (error) {
        setError(formatAIError(error));
      } finally {
        setLoading(false);
      }
    },
    [sourceLanguage, targetLanguage, translate, setSelectedTranslation],
  );

  const updateTranslationRef = useRef(updateTranslation);

  const updateTranslationWithDelay = useMemo(
    () =>
      debounce(async (text: string) => {
        await updateTranslationRef.current(text);
      }, delay.current),
    [delay],
  );

  useEffect(() => {
    updateTranslationRef.current = updateTranslation;
  }, [updateTranslation]);

  useEffect(() => {
    if (!shouldUpdateTranslation.current) return;
    updateTranslationWithDelay(translateInputRef.current!.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceLanguage, targetLanguage]);

  useEffect(() => {
    if (selectedTranslation) {
      shouldUpdateTranslation.current = false;
      console.log("Selected translation:", selectedTranslation);
      const sourceLang = languages.find(
        (lang) =>
          lang.name === selectedTranslation.sourceLanguage ||
          lang.code === selectedTranslation.sourceLanguage,
      );
      const targetLang = languages.find(
        (lang) =>
          lang.name === selectedTranslation.targetLanguage ||
          lang.code === selectedTranslation.targetLanguage,
      );
      if (sourceLang) setSourceLanguage(sourceLang);
      if (targetLang) setTargetLanguage(targetLang);
      if (translateInputRef.current)
        translateInputRef.current.value = selectedTranslation.sourceText;
      setTranslatedText(selectedTranslation.translatedText);
      if (savedTranslations) {
        const savedVariant = savedTranslations.find(
          (translation) => translation.id === selectedTranslation.id,
        );
        if (savedVariant) setIsTranslationSaved(true);
        else setIsTranslationSaved(false);
      }
      setTimeout(() => {
        shouldUpdateTranslation.current = true;
      }, delay.current);
    } else {
      console.log("Unselected translation");
      if (translateInputRef.current) translateInputRef.current.value = "";
      if (translatedText) setTranslatedText(null);
      if (isTranslationSaved) setIsTranslationSaved(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTranslation]);

  useEffect(() => {
    if (
      !translationHistory ||
      !initialTranslationHistory ||
      translationHistory.length <= initialTranslationHistory.length
    ) {
      return;
    }

    const recent = translationHistory[0];
    setSelectedTranslation({
      id: recent.id,
      sourceText: recent.sourceText,
      translatedText: recent.translatedText,
      sourceLanguage: recent.sourceLanguage,
      targetLanguage: recent.targetLanguage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translationHistory, initialTranslationHistory]);

  useEffect(() => {
    if (!currentUser) {
      if (translateInputRef.current) translateInputRef.current.value = "";
      if (translatedText) setTranslatedText(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    return () => {
      updateTranslationWithDelay.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (e.target.value.trim() === "") {
      isCancelled.current = true;
      setTranslatedText("");
      setSelectedTranslation(null);
      setLoading(false);
      return;
    }
    isCancelled.current = false;
    updateTranslationWithDelay(e.target.value);
  };

  const handleSwitch = () => {
    if (translatedText) translateInputRef.current!.value = translatedText;
    const langTemp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(langTemp);

    translateInputRef.current?.focus();
  };

  const handleSave = () => {
    if (!selectedTranslation) return;

    if (isTranslationSaved) {
      deleteTranslationFromUserSaved(selectedTranslation.id);
      setIsTranslationSaved(false);
    } else {
      addTranslationToUserSaved({
        id: selectedTranslation.id,
        sourceText: selectedTranslation.sourceText,
        translatedText: selectedTranslation.translatedText,
        sourceLanguage: selectedTranslation.sourceLanguage,
        targetLanguage: selectedTranslation.targetLanguage,
      });
      translateInputRef.current?.focus();
      setIsTranslationSaved(true);
    }
  };

  return (
    <>
      <div
        className="w-full flex flex-col items-center bg-background-100 dark:bg-background-dark-300
          pl-3.5 pr-3.5 pt-6 pb-6 rounded-4xl"
      >
        <div className="flex flex-col w-full h-full pl-3.5 pr-3.5 pt-1 pb-1 overflow-y-auto">
          {error &&
            (Array.isArray(error) && error.length > 1 ? (
              <ul className="error mb-2">
                {error.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            ) : (
              <div className="error mb-2">{error}</div>
            ))}
          <div
            className="group border h-48 w-full pl-2.5 pr-2.5 pt-1.5 pb-1.5 shrink-0 resize-none
              transition-all duration-300 border-border-100 dark:border-none bg-background-100
              dark:bg-background-dark-100 rounded-3xl shadow-subtle outline-none
              focus-within:shadow-text-box"
          >
            <textarea
              onChange={handleInputChange}
              ref={translateInputRef}
              id="translate-input"
              placeholder="Type here..."
              dir="auto"
              maxLength={6000}
              className="h-full w-full pl-2.5 pr-2.5 pt-1.5 pb-1.5 overflow-y-auto resize-none
                outline-none text-primary-100 dark:text-primary-dark-100"
            />
          </div>
          <div className="flex mt-4 mb-4 pl-5 pr-5 items-end justify-between gap-8 w-full">
            <div className="flex gap-4">
              {/* placeholder for left side buttons */}
            </div>
            <div className="flex gap-8 items-end">
              <LanguageSelector
                onChange={setSourceLanguage}
                languages={languages}
                value={sourceLanguage}
                label={"Source language"}
                id="source-language-select"
              />
              <SwitchButton onClick={handleSwitch} />
              <LanguageSelector
                onChange={setTargetLanguage}
                languages={languages}
                value={targetLanguage}
                label={"Target language"}
                id="target-language-select"
              />
            </div>
            <div className="flex gap-4">
              <SaveButton
                ref={saveButtonRef}
                isSaved={isTranslationSaved}
                onClick={handleSave}
              />
            </div>
          </div>
          <div
            ref={translateOutputRef}
            id="translate-output"
            dir="auto"
            className="relative border flex-1 border-border-100 dark:border-none bg-background-200
              text-primary-200 dark:text-primary-dark-200 dark:bg-background-dark-200 w-full
              pl-5 pr-5 pt-3 pb-3 resize-none transition-all duration-300 rounded-3xl
              shadow-subtle whitespace-pre-line"
          >
            <div>
              {loading ? (
                <div
                  className="select-none text-secondary-200 dark:text-secondary-dark-200
                    animate-[pulse_1.2s_cubic-bezier(.2,.35,.8,.65)_infinite]"
                >
                  Translating...
                </div>
              ) : (
                translatedText
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
