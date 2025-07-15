import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { AuthProvider } from "./features/auth/AuthProvider";
import { GeminiProvider } from "./features/gemini/GeminiProvider";
import ThemeProvider from "./features/theme/ThemeProvider";
import { FirestoreProvider } from "./features/firestore/FirestoreProvider";
import Header from "./components/Header";
import TooltipProvider from "./features/tooltip/TooltipProvider";
import LocalizatonProvider from "./features/localization/LocalizatonProvider";

function App() {
  return (
    <>
      <LocalizatonProvider>
        <ThemeProvider>
          <AuthProvider>
            <FirestoreProvider>
              <GeminiProvider>
                <TooltipProvider>
                  <div
                    id="app"
                    className="h-screen p-6 m-auto flex flex-col bg-background-300 dark:bg-background-dark-400
                      text-primary-200 dark:text-primary-dark-200 transition-colors duration-300"
                  >
                    <Router>
                      <Header />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                      </Routes>
                    </Router>
                  </div>
                </TooltipProvider>
              </GeminiProvider>
            </FirestoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </LocalizatonProvider>
    </>
  );
}

export default App;
