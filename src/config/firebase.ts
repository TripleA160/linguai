import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);

export const geminiAi = getAI(app, { backend: new GoogleAIBackend() });
export const geminiModels = {
  gemini25Flash: {
    name: "Gemini 2.5 Flash",
    model: getGenerativeModel(geminiAi, {
      model: "gemini-2.5-flash",
    }),
  },
  gemini25Lite: {
    name: "Gemini 2.5 Lite",
    model: getGenerativeModel(geminiAi, {
      model: "gemini-2.5-flash-lite",
    }),
  },
  gemini20Flash: {
    name: "Gemini 2.0 Flash",
    model: getGenerativeModel(geminiAi, {
      model: "gemini-2.0-flash",
    }),
  },
  gemini20Lite: {
    name: "Gemini 2.0 Flash Lite",
    model: getGenerativeModel(geminiAi, {
      model: "gemini-2.0-flash-lite",
    }),
  },
};
export const geminiModelMain = getGenerativeModel(geminiAi, {
  model: "gemini-2.0-flash",
});
export const geminiModelLite = getGenerativeModel(geminiAi, {
  model: "gemini-2.0-flash-lite",
});

export default app;
