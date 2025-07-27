import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import LocalizationProvider from "./features/localization/LocalizationProvider.tsx";
import ThemeProvider from "./features/theme/ThemeProvider.tsx";
import { AuthProvider } from "./features/auth/AuthProvider.tsx";
import { FirestoreProvider } from "./features/firestore/FirestoreProvider.tsx";
import { GeminiProvider } from "./features/gemini/GeminiProvider.tsx";
import TooltipProvider from "./features/tooltip/TooltipProvider.tsx";
import AlertProvider from "./features/alert/AlertProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LocalizationProvider>
        <ThemeProvider>
          <AuthProvider>
            <FirestoreProvider>
              <GeminiProvider>
                <TooltipProvider>
                  <AlertProvider>
                    <App />
                  </AlertProvider>
                </TooltipProvider>
              </GeminiProvider>
            </FirestoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>,
);
