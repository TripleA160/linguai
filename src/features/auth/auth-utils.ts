import { type User, updateEmail, updateProfile } from "firebase/auth";

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
