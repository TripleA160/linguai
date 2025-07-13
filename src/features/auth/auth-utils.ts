import { updateEmail, updateProfile } from "firebase/auth";
import type { User } from "../../types/firebase-types";

export async function updateUserInAuth(
  user: User,
  data: { email?: string; displayName?: string },
) {
  if (!user) return;

  if (data.email) {
    await updateEmail(user, data.email);
  }
  if (data.displayName) {
    await updateProfile(user, { displayName: data.displayName });
  }
}
