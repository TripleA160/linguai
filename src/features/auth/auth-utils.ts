import type { User } from "../../types/firebase-types";

export async function updateUserInAuth(
  user: User,
  data: { email?: string; displayName?: string },
) {
  if (!user) return;

  if (data.email) {
    await user.updateEmail(data.email);
  }
  if (data.displayName) {
    await user.updateProfile({ displayName: data.displayName });
  }
}
