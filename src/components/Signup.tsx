import { useRef, useState, type FormEvent } from "react";
import { formatFirebaseError } from "../utils/firebase-utils";
import { useAuth } from "../features/auth/useAuth";
import { useLocalization } from "../features/localization/useLocalization";
import { useAlert } from "../features/alert/useAlert";

const Signup = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { currentLocale } = useLocalization();
  const alert = useAlert();

  const { signup } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (
      !nameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !passwordConfirmRef.current
    )
      return;

    const inputError: string[] = [];

    if (!nameRef.current.value)
      inputError.push(currentLocale.errors.form.nameMissing);

    if (!emailRef.current.value)
      inputError.push(currentLocale.errors.form.emailMissing);

    if (!passwordRef.current.value)
      inputError.push(currentLocale.errors.form.passwordMissing);

    if (passwordRef.current.value && !passwordConfirmRef.current.value)
      inputError.push(currentLocale.errors.form.passwordConfirmationMissing);

    if (inputError.length > 0) return setError(inputError);

    const password = passwordRef.current.value;
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

    if (passwordError.length > 0) return setError(passwordError);

    if (password !== passwordConfirmRef.current.value)
      return setError(currentLocale.errors.form.passwordDoNotMatch);

    setLoading(true);

    try {
      await signup(emailRef.current.value, password, nameRef.current.value);
      setError(null);
      setLoading(false);
      alert.showAlert("info", 4000, currentLocale.auth.verificationSent);
    } catch (error) {
      setError(formatFirebaseError(error, currentLocale));
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex max-w-lg min-w-xs flex-1 flex-col items-center gap-4 p-6 self-center w-full"
      >
        <h1 className="mb-6 text-3xl select-none">
          {currentLocale.auth.signUp}
        </h1>
        {error &&
          (Array.isArray(error) && error.length > 1 ? (
            <ul className="error" dir="auto">
              {error.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          ) : (
            <div className="error" dir="auto">
              {error}
            </div>
          ))}
        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="display-name" dir="auto" className="w-full">
            {currentLocale.auth.displayName}
          </label>
          <input
            ref={nameRef}
            type="text"
            id="display-name"
            name="display-name"
            required
            className="border-border-100 focus:outline-primary-200 dark:focus:outline-primary-dark-200
              focus:border-primary-200 dark:focus:border-primary-dark-200 h-11 w-full
              rounded-md border-2 p-2 outline-1 outline-transparent transition-colors
              duration-250"
            dir="auto"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="email" dir="auto" className="w-full">
            {currentLocale.auth.email}
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            className="border-border-100 focus:outline-primary-200 dark:focus:outline-primary-dark-200
              focus:border-primary-200 dark:focus:border-primary-dark-200 h-11 w-full
              rounded-md border-2 p-2 outline-1 outline-transparent transition-colors
              duration-250"
            dir="auto"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="password" dir="auto" className="w-full">
            {currentLocale.auth.password}
          </label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className="border-border-100 focus:outline-primary-200 dark:focus:outline-primary-dark-200
              focus:border-primary-200 dark:focus:border-primary-dark-200 h-11 w-full
              rounded-md border-2 p-2 outline-1 outline-transparent transition-colors
              duration-250"
            dir="auto"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="password-confirm" dir="auto" className="w-full">
            {currentLocale.auth.confirmPassword}
          </label>
          <input
            ref={passwordConfirmRef}
            type="password"
            id="password-confirm"
            name="password-confirm"
            className="border-border-100 focus:outline-primary-200 dark:focus:outline-primary-dark-200
              focus:border-primary-200 dark:focus:border-primary-dark-200 h-11 w-full
              rounded-md border-2 p-2 outline-1 outline-transparent transition-colors
              duration-250"
            dir="auto"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="focus:outline-primary-200 focus:shadow-button
            dark:focus:outline-primary-dark-200 bg-secondary-100 dark:bg-secondary-dark-100
            hover:bg-secondary-200 dark:hover:bg-secondary-dark-200
            focus-visible:bg-secondary-200 dark:focus-visible:bg-secondary-dark-200
            active:bg-secondary-300 dark:active:bg-secondary-dark-300 mt-4 h-11 w-full
            cursor-pointer rounded-md text-white outline-1 outline-transparent
            transition-all duration-180 dark:text-black"
        >
          {currentLocale.auth.signUp}
        </button>
      </form>
    </>
  );
};

export default Signup;
