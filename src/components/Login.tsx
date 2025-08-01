import { useRef, useState, type FormEvent } from "react";
import { formatFirebaseError } from "../utils/firebase-utils";
import { useAuth } from "../features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "../features/localization/useLocalization";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { currentLocale } = useLocalization();

  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const inputError: string[] = [];

    if (!emailRef.current.value)
      inputError.push(currentLocale.errors.form.emailMissing);

    if (!passwordRef.current.value)
      inputError.push(currentLocale.errors.form.passwordMissing);

    if (inputError.length > 0) return setError(inputError);

    setLoading(true);

    try {
      await login(emailRef.current!.value, passwordRef.current!.value);
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(formatFirebaseError(error, "login", currentLocale));
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex max-w-lg min-w-2xs flex-1 flex-col items-center gap-4 p-5 md:p-6
          self-center w-full"
      >
        <h1 className="mb-6 text-3xl text-center select-none">
          {currentLocale.auth.login}
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
        <div className="flex w-full flex-col items-start gap-2 text-base">
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
        <div className="flex w-full flex-col items-start gap-2 text-base">
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
        <button
          disabled={loading}
          type="submit"
          className="focus:outline-primary-200 focus:shadow-button
            dark:focus:outline-primary-dark-200 bg-secondary-100 dark:bg-secondary-dark-100
            hover:bg-secondary-200 dark:hover:bg-secondary-dark-200
            focus-visible:bg-secondary-200 dark:focus-visible:bg-secondary-dark-200
            active:bg-secondary-300 dark:active:bg-secondary-dark-300 mt-4 h-11 w-full
            cursor-pointer rounded-xl text-base text-white outline-1 outline-transparent
            transition-all duration-180 dark:text-black"
        >
          {currentLocale.auth.login}
        </button>
      </form>
    </>
  );
};

export default Login;
