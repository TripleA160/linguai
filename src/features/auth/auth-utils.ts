import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  type User,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

export async function updateUserInAuth(
  user: User,
  data: { email?: string; displayName?: string },
  password?: string,
) {
  if (!user) return;

  if (data.email && user.email) {
    if (!password) {
      throw new FirebaseError(
        "auth/email-change-need-password",
        "You can't change email without re-entering your password (auth/email-change-need-password)",
      );
    }

    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await verifyBeforeUpdateEmail(user, data.email);
  }
  if (data.displayName) {
    await updateProfile(user, { displayName: data.displayName });
  }
}

export async function updateUserPassword(
  user: User,
  currentPassword: string,
  newPassword: string,
) {
  if (!user || !user.email) return;

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
}
