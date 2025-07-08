import { useContext } from "react";
import { FirestoreContext } from "./FirestoreContext";

export const useFirestore = () => {
  const context = useContext(FirestoreContext);
  if (!context)
    throw new Error("useFirestore must be used within FirestoreProvider");
  return context;
};
