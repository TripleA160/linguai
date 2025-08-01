import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useLocalization } from "../features/localization/useLocalization";
import { useAuth } from "../features/auth/useAuth";
import { formatFirebaseError } from "../utils/firebase-utils";
import { useAlert } from "../features/alert/useAlert";

const Account = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const emailPasswordRef = useRef<HTMLInputElement | null>(null);
  const currentPasswordRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const alert = useAlert();
  const { currentLocale, currentLanguage } = useLocalization();

  const { updateProfile, login, changePassword, currentUser } = useAuth();

  const [hasNameChanged, setHasNameChanged] = useState<boolean>(false);
  const [hasEmailChanged, setHasEmailChanged] = useState<boolean>(false);
  const [hasPasswordChanged, setHasPasswordChanged] = useState<boolean>(false);
  const [isNameUpdated, setIsNameUpdated] = useState<boolean>(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState<boolean>(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState<boolean>(false);
  const [profileError, setProfileError] = useState<string | string[] | null>(
    null,
  );
  const [securityError, setSecurityError] = useState<string | string[] | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();

    const err: string | string[] = [];

    setLoading(true);

    if (
      currentUser &&
      nameRef.current &&
      nameRef.current.value &&
      nameRef.current.value.trim() != currentUser.displayName?.trim()
    ) {
      try {
        await updateProfile({ displayName: nameRef.current.value.trim() });
        setIsNameUpdated(true);
        setHasNameChanged(false);
        setTimeout(() => setIsNameUpdated(false), 2500);
      } catch (error) {
        err.push(formatFirebaseError(error, "profile", currentLocale));
      }
    }
    if (
      currentUser &&
      emailRef.current &&
      emailPasswordRef.current &&
      emailRef.current.value &&
      emailRef.current.value.trim() != currentUser.email?.trim()
    ) {
      try {
        await updateProfile(
          { email: emailRef.current.value.trim() },
          emailPasswordRef.current.value,
        );
        if (currentUser.email)
          await login(currentUser.email, emailPasswordRef.current.value);
        alert.showAlert(
          "info",
          5000,
          currentLocale.auth.newEmailVerificationSent,
        );

        setIsEmailUpdated(true);
        setHasEmailChanged(false);
        setTimeout(() => setIsEmailUpdated(false), 2500);
      } catch (error) {
        err.push(formatFirebaseError(error, "profile", currentLocale));
      }
    }

    setLoading(false);

    if (err.length === 1) setProfileError(err[0]);
    else if (err.length > 0) setProfileError(err);
    else setProfileError(null);
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !currentPasswordRef.current ||
      !newPasswordRef.current ||
      !passwordConfirmRef.current
    )
      return;

    const inputError: string[] = [];

    if (!currentPasswordRef.current.value)
      inputError.push(currentLocale.errors.form.currentPasswordMissing);

    if (!newPasswordRef.current.value)
      inputError.push(currentLocale.errors.form.newPasswordMissing);

    if (
      currentPasswordRef.current.value &&
      newPasswordRef.current.value &&
      !passwordConfirmRef.current.value
    )
      inputError.push(currentLocale.errors.form.passwordConfirmationMissing);

    if (inputError.length === 1) return setSecurityError(inputError[0]);
    else if (inputError.length > 0) return setSecurityError(inputError);
    else setSecurityError(null);

    const password = newPasswordRef.current.value;

    const passwordError: string[] = [];

    if (password.length < 8)
      passwordError.push(currentLocale.errors.form.passwordInvalidLength);

    if (!/^[A-Za-z0-9!@#$%^&*()_\-+=[\]{}|:;"'<>,.?/~`\\]+$/.test(password)) {
      passwordError.push(currentLocale.errors.form.passwordInvalidCharacter);
    }
    if (!/^[A-Za-z]/.test(password)) {
      passwordError.push(currentLocale.errors.form.passwordInvalidStart);
    }

    if (!/[a-z]/.test(password))
      passwordError.push(currentLocale.errors.form.passwordNoLowercase);
    if (!/[A-Z]/.test(password))
      passwordError.push(currentLocale.errors.form.passwordNoUppercase);

    if (passwordError.length === 1) return setSecurityError(passwordError[0]);
    else if (passwordError.length > 0) return setSecurityError(passwordError);
    else setSecurityError(null);

    if (password !== passwordConfirmRef.current.value)
      return setSecurityError(currentLocale.errors.form.passwordDoNotMatch);

    setLoading(true);

    try {
      await changePassword(
        currentPasswordRef.current.value,
        newPasswordRef.current.value,
      );
      alert.showAlert(
        "success",
        5000,
        currentLocale.auth.passwordChangeSuccess,
      );

      setIsPasswordUpdated(true);
      currentPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      passwordConfirmRef.current.value = "";
      setTimeout(() => setIsPasswordUpdated(false), 2500);
    } catch (error) {
      passwordError.push(
        formatFirebaseError(error, "passwordChange", currentLocale),
      );
    }

    setLoading(false);

    if (passwordError.length === 1) setSecurityError(passwordError[0]);
    else if (passwordError.length > 0) setSecurityError(passwordError);
    else setSecurityError(null);
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      currentUser &&
      currentUser.displayName &&
      e.target.value.trim() != currentUser.displayName.trim()
    )
      setHasNameChanged(true);
    else setHasNameChanged(false);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      currentUser &&
      currentUser.email &&
      e.target.value.trim() != currentUser.email.trim()
    )
      setHasEmailChanged(true);
    else setHasEmailChanged(false);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) setHasPasswordChanged(true);
    else setHasPasswordChanged(false);
  };

  useEffect(() => {
    if (currentUser && currentUser.displayName && nameRef.current)
      nameRef.current.value = currentUser.displayName;
    if (currentUser && currentUser.email && emailRef.current)
      emailRef.current.value = currentUser.email;
  }, [currentUser]);

  return (
    <div
      className="w-full flex flex-col items-center p-5 md:p-6 gap-4 scrollbar-thin
        scrollbar-track-transparent scrollbar-thumb-secondary-dark-300
        dark:scrollbar-thumb-secondary-dark-200 overflow-auto"
    >
      <h1 className="mb-6 text-3xl text-center select-none">
        {currentLocale.navigation.accountSettings}
      </h1>
      {!currentUser?.emailVerified && (
        <div className="warning" dir="auto">
          {currentLocale.errors.auth.profile["auth/operation-not-allowed"]}
        </div>
      )}
      <h2
        className="w-full rounded-lg bg-background-200 dark:bg-background-dark-200 mb-2 p-3
          text-2xl text-center select-none"
      >
        {currentLocale.auth.profileInfo}
      </h2>
      <form
        onSubmit={handleProfileSubmit}
        noValidate
        className="flex flex-1 flex-col items-center gap-4 mb-8 self-center w-full md:w-3/5"
      >
        {profileError &&
          (Array.isArray(profileError) && profileError.length > 1 ? (
            <ul className="error" dir="auto">
              {profileError.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          ) : (
            <div className="error" dir="auto">
              {profileError}
            </div>
          ))}
        <div className="flex w-full flex-col items-start gap-2 text-base">
          <label htmlFor="display-name" dir="auto" className="w-full">
            {currentLocale.auth.displayName} {hasNameChanged && "*"}
          </label>
          <input
            ref={nameRef}
            onChange={handleNameChange}
            disabled={!currentUser?.emailVerified}
            type="text"
            id="display-name"
            name="display-name"
            className={`${
              isNameUpdated
                ? "bg-green-100 outline-green-400 dark:bg-green-800 dark:outline-green-600"
                : `outline-transparent focus:outline-primary-200
                  dark:focus:outline-primary-dark-200 focus:border-primary-200
                  dark:focus:border-primary-dark-200`
              } border-border-100 h-11 w-full rounded-md border-2 p-2 outline-1
              [transition:color_250ms_ease-in-out_0s,outline-color_250ms_ease-in-out_0s,border-color_250ms_ease-in-out_0s,background-color_500ms_cubic-bezier(.17,.67,.83,.67)_0s]`}
            dir="auto"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2 text-base">
          <label htmlFor="email" dir="auto" className="w-full">
            {currentLocale.auth.email} {hasEmailChanged && "*"}
          </label>
          <input
            ref={emailRef}
            onChange={handleEmailChange}
            disabled={!currentUser?.emailVerified}
            type="email"
            id="email"
            name="email"
            className={`${
              isEmailUpdated
                ? "bg-green-100 outline-green-400"
                : `outline-transparent focus:outline-primary-200
                  dark:focus:outline-primary-dark-200 focus:border-primary-200
                  dark:focus:border-primary-dark-200`
              } border-border-100 h-11 w-full rounded-md border-2 p-2 outline-1
              [transition:color_250ms_ease-in-out_0s,outline-color_250ms_ease-in-out_0s,border-color_250ms_ease-in-out_0s,background-color_500ms_cubic-bezier(.17,.67,.83,.67)_0s]`}
            dir="auto"
          />
        </div>
        <div
          className={`flex w-full items-center gap-2 -mt-4 text-base
            ${currentLanguage.direction === "ltr" ? "flex-row" : "flex-row-reverse"}
            ${hasEmailChanged ? " visible" : " invisible"}`}
        >
          <input
            ref={emailPasswordRef}
            disabled={!hasEmailChanged}
            type="password"
            id="email-password"
            name="email-password"
            className={` ${hasEmailChanged ? "max-h-9 p-2" : "max-h-0 p-0"} ml-2 border-2 border-t-0
              outline-transparent focus:outline-primary-200
              dark:focus:outline-primary-dark-200 focus:border-primary-200
              dark:focus:border-primary-dark-200 border-border-100 w-full rounded-md
              rounded-t-none outline-1
              [transition:color_250ms_ease-in-out_0s,outline-color_250ms_ease-in-out_0s,border-color_250ms_ease-in-out_0s,max-height_200ms_ease-out_0s]`}
            dir="auto"
          />
          <label
            htmlFor="email-password"
            dir="auto"
            className={`whitespace-nowrap ${hasEmailChanged ? "max-h-9" : "max-h-0"}`}
          >
            {currentLocale.auth.password}
          </label>
        </div>
        <button
          disabled={loading || !(hasNameChanged || hasEmailChanged)}
          type="submit"
          className={`${
            hasNameChanged || hasEmailChanged
              ? `opacity-100 cursor-pointer focus:outline-primary-200 focus:shadow-button
                dark:focus:outline-primary-dark-200 hover:bg-secondary-200
                dark:hover:bg-secondary-dark-200 focus-visible:bg-secondary-200
                dark:focus-visible:bg-secondary-dark-200 active:bg-secondary-300
                dark:active:bg-secondary-dark-300`
              : "opacity-45 cursor-default"
            } bg-secondary-100 dark:bg-secondary-dark-100 mt-4 h-11 w-full rounded-md
            text-white outline-1 outline-transparent transition-all duration-180
            dark:text-black`}
        >
          {currentLocale.auth.apply}
        </button>
      </form>

      <h2
        className="w-full rounded-lg bg-background-200 dark:bg-background-dark-200 mb-2 p-3
          text-2xl text-center select-none"
      >
        {currentLocale.auth.security}
      </h2>
      <form
        onSubmit={handlePasswordSubmit}
        noValidate
        className="flex flex-1 flex-col items-center gap-4 self-center w-full md:w-3/5"
      >
        {securityError &&
          (Array.isArray(securityError) && securityError.length > 1 ? (
            <ul className="error" dir="auto">
              {securityError.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          ) : (
            <div className="error" dir="auto">
              {securityError}
            </div>
          ))}
        <div className="flex w-full flex-col items-start gap-2 text-base">
          <label htmlFor="current-password" dir="auto" className="w-full">
            {currentLocale.auth.currentPassword}
          </label>
          <input
            ref={currentPasswordRef}
            onChange={handlePasswordChange}
            type="password"
            id="current-password"
            name="current-password"
            required
            className={`${
              isPasswordUpdated
                ? "bg-green-100 outline-green-400 dark:bg-green-800 dark:outline-green-600"
                : `outline-transparent focus:outline-primary-200
                  dark:focus:outline-primary-dark-200 focus:border-primary-200
                  dark:focus:border-primary-dark-200`
              } border-border-100 h-11 w-full rounded-md border-2 p-2 outline-1
              [transition:color_250ms_ease-in-out_0s,outline-color_250ms_ease-in-out_0s,border-color_250ms_ease-in-out_0s,background-color_500ms_cubic-bezier(.17,.67,.83,.67)_0s]`}
            dir="auto"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2 text-base">
          <label htmlFor="new-password" dir="auto" className="w-full">
            {currentLocale.auth.newPassword}
          </label>
          <input
            ref={newPasswordRef}
            onChange={handlePasswordChange}
            type="password"
            id="new-password"
            name="new-password"
            required
            className={`${
              isPasswordUpdated
                ? "bg-green-100 outline-green-400 dark:bg-green-800 dark:outline-green-600"
                : `outline-transparent focus:outline-primary-200
                  dark:focus:outline-primary-dark-200 focus:border-primary-200
                  dark:focus:border-primary-dark-200`
              } border-border-100 h-11 w-full rounded-md border-2 p-2 outline-1
              [transition:color_250ms_ease-in-out_0s,outline-color_250ms_ease-in-out_0s,border-color_250ms_ease-in-out_0s,background-color_500ms_cubic-bezier(.17,.67,.83,.67)_0s]`}
            dir="auto"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2 text-base">
          <label htmlFor="confirm-password" dir="auto" className="w-full">
            {currentLocale.auth.confirmPassword}
          </label>
          <input
            ref={passwordConfirmRef}
            onChange={handlePasswordChange}
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
            className={`${
              isPasswordUpdated
                ? "bg-green-100 outline-green-400 dark:bg-green-800 dark:outline-green-600"
                : `outline-transparent focus:outline-primary-200
                  dark:focus:outline-primary-dark-200 focus:border-primary-200
                  dark:focus:border-primary-dark-200`
              } border-border-100 h-11 w-full rounded-md border-2 p-2 outline-1
              [transition:color_250ms_ease-in-out_0s,outline-color_250ms_ease-in-out_0s,border-color_250ms_ease-in-out_0s,background-color_500ms_cubic-bezier(.17,.67,.83,.67)_0s]`}
            dir="auto"
          />
        </div>
        <button
          disabled={loading || !hasPasswordChanged}
          type="submit"
          className={`${
            hasPasswordChanged
              ? `opacity-100 cursor-pointer focus:outline-primary-200 focus:shadow-button
                dark:focus:outline-primary-dark-200 hover:bg-secondary-200
                dark:hover:bg-secondary-dark-200 focus-visible:bg-secondary-200
                dark:focus-visible:bg-secondary-dark-200 active:bg-secondary-300
                dark:active:bg-secondary-dark-300`
              : "opacity-45 cursor-default"
            } bg-secondary-100 dark:bg-secondary-dark-100 mt-4 h-11 w-full rounded-md
            text-base text-white outline-1 outline-transparent transition-all duration-180
            dark:text-black`}
        >
          {currentLocale.auth.change}
        </button>
      </form>
    </div>
  );
};

export default Account;
