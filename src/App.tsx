import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { useFirestore } from "./features/firestore/useFirestore";
import Translator from "./components/Translator";
import MainPanel from "./components/MainPanel";
import Saved from "./components/Saved";
import History from "./components/History";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./components/Account";
import GuestRoute from "./components/GuestRoute";
import MobileTranslator from "./components/MobileTranslator";

function App() {
  const [selectedTranslation, setSelectedTranslation] = useState<{
    id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    createdAt: string;
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

  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const checkSize = () => {
      if (typeof window !== "undefined" && window.innerWidth < 768)
        setIsMobileScreen(true);
      else setIsMobileScreen(false);
    };

    checkSize();

    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div
      id="app"
      className="h-full p-5 md:p-6 m-auto flex flex-col bg-background-300
        dark:bg-background-dark-400 text-primary-200 dark:text-primary-dark-200
        transition-colors duration-300"
    >
      <Header />
      <div className="flex flex-1 gap-3 justify-center overflow-hidden">
        {!isMobileScreen && isHome && (
          <History
            onSelect={setSelectedTranslation}
            onDelete={deleteFromHistory}
          />
        )}
        <MainPanel
          className={
            !isMobileScreen && !isHome
              ? location.pathname === "/account"
                ? "w-3/5"
                : "w-1/2"
              : "w-full"
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                isMobileScreen ? (
                  <MobileTranslator
                    selectedTranslation={selectedTranslation}
                    setSelectedTranslation={setSelectedTranslation}
                    onHistoryDelete={deleteFromHistory}
                    onSavedDelete={deleteFromSaved}
                  />
                ) : (
                  <Translator
                    selectedTranslation={selectedTranslation}
                    setSelectedTranslation={setSelectedTranslation}
                  />
                )
              }
            />
            <Route
              path="/signup"
              element={
                <GuestRoute>
                  <Signup />
                </GuestRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
          </Routes>
        </MainPanel>
        {!isMobileScreen && isHome && (
          <Saved onSelect={setSelectedTranslation} onDelete={deleteFromSaved} />
        )}
      </div>
    </div>
  );
}

export default App;
