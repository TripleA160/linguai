import { createContext } from "react";
import type { AuthContextData } from "../../types/firebase-types";

export const AuthContext = createContext<AuthContextData>({
  currentUser: null,
  signup: () => Promise.resolve(null),
  login: () => Promise.resolve(null),
  logout: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  updateProfileInAuth: () => Promise.resolve(),
});
