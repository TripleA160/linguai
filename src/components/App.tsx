import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import { AuthProvider } from "../features/auth/AuthProvider";
import CreateProfile from "./CreateProfile";
import { GeminiProvider } from "../features/gemini/GeminiProvider";
import ThemeProvider from "../features/theme/ThemeProvider";
import { FirestoreProvider } from "../features/firestore/FirestoreProvider";
import Header from "./Header";
import TooltipProvider from "../features/tooltip/TooltipProvider";

function App() {
  return (
    <>
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
                      <Route
                        path="/create-profile"
                        element={<CreateProfile />}
                      />
                    </Routes>
                  </Router>
                </div>
              </TooltipProvider>
            </GeminiProvider>
          </FirestoreProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
