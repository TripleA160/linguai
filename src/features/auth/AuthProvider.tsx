import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../../config/firebase";
import { AuthContext } from "./AuthContext";
import type { AuthContextData } from "../../types/firebase-types";
import { updateUserInAuth } from "./auth-utils";
import { updateUserInDB } from "../firestore/firestore-utils";
import {
  type User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function signup(email: string, password: string, displayName?: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (userCredential.user) {
      sendEmailVerification(userCredential.user);
      if (displayName) {
        await updateUserInAuth(userCredential.user, { email, displayName });
        await reload(userCredential.user);
        await updateUserInDB(userCredential.user, { email, displayName }, true);
      } else {
        await updateUserInDB(
          userCredential.user,
          {
            email,
          },
          true,
        );
      }
      setCurrentUser({ ...userCredential.user });
    }
    return userCredential;
  }

  async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (userCredential.user) {
      setCurrentUser({ ...userCredential.user });
    }
    return userCredential;
  }

  async function logout() {
    await signOut(auth);
    setCurrentUser(null);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  async function updateProfile(
    data: { email?: string; displayName?: string },
    user?: User,
  ) {
    const targetUser = user || auth.currentUser;

    if (targetUser) {
      await updateUserInAuth(targetUser, data);
      await updateUserInDB(targetUser, data);

      if (auth.currentUser) {
        await reload(auth.currentUser);
        setCurrentUser({ ...auth.currentUser });
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const contextData: AuthContextData = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
