import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  type User,
  reauthenticateWithCredential,
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
