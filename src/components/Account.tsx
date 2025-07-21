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

const Account = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { currentLocale } = useLocalization();

  const { updateProfile, currentUser } = useAuth();

  const [hasNameChanged, setHasNameChanged] = useState<boolean>(false);
  const [hasEmailChanged, setHasEmailChanged] = useState<boolean>(false);
  const [isNameUpdated, setIsNameUpdated] = useState<boolean>(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState<boolean>(false);
  const [profileError, setProfileError] = useState<string | string[] | null>(
    null,
  );
  //const [securityError, setSecurityError] = useState<string | string[] | null>(null);
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
        err.push(formatFirebaseError(error, currentLocale));
      }
    }
    if (
      currentUser &&
      emailRef.current &&
      emailRef.current.value &&
      emailRef.current.value.trim() != currentUser.email?.trim()
    ) {
      try {
        await updateProfile({ email: emailRef.current.value.trim() });
        setIsEmailUpdated(true);
        setHasEmailChanged(false);
        setTimeout(() => setIsEmailUpdated(false), 2500);
      } catch (error) {
        err.push(formatFirebaseError(error, currentLocale));
      }
    }

    setLoading(false);

    if (err.length === 1) setProfileError(err[0]);
    else if (err.length > 0) setProfileError(err);
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
    ) {
      setHasEmailChanged(true);
    } else setHasEmailChanged(false);
  };

  useEffect(() => {
    if (currentUser && currentUser.displayName && nameRef.current)
      nameRef.current.value = currentUser.displayName;
    if (currentUser && currentUser.email && emailRef.current)
      emailRef.current.value = currentUser.email;
  }, [currentUser]);

  return (
    <div className="w-full flex flex-col items-center p-6 gap-4 overflow-auto">
      <h1 className="mb-6 text-3xl select-none">Account Settings</h1>
      {!currentUser?.emailVerified && (
        <div className="warning" dir="auto">
          {currentLocale.errors.auth["auth/operation-not-allowed"]}
        </div>
      )}
      <form
        onSubmit={handleProfileSubmit}
        noValidate
        className="flex flex-1 flex-col items-center gap-4 mb-8 self-center w-full"
      >
        <h2
          className="w-full rounded-lg bg-background-200 dark:bg-background-dark-200 mb-2 p-3
            text-2xl text-center select-none"
        >
          {currentLocale.auth.profileInfo}
        </h2>
        <div className="flex flex-col items-center gap-4 w-3/5">
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
          <div className="flex w-full flex-col items-start gap-2">
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
              required
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
          <div className="flex w-full flex-col items-start gap-2">
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
        </div>
      </form>

      {/* <form
        onSubmit={handleProfileSubmit}
        noValidate
        className="flex flex-1 flex-col items-center gap-4 self-center w-full"
      >
        <h2
          className="w-full rounded-lg bg-background-200 dark:bg-background-dark-200 mb-2 p-3
            text-2xl text-center select-none"
        >
          {currentLocale.auth.security}
        </h2>
        <div className="flex flex-col items-center gap-4 w-3/5">
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
        </div>
      </form> */}
    </div>
  );
};

export default Account;
