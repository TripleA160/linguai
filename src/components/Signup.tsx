import { useRef, useState, type FormEvent } from "react";
import { formatFirebaseError } from "../utils/firebase-utils";
import { useAuth } from "../features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "../features/localization/useLocalization";

const Signup = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { currentLocale } = useLocalization();

  const { signup } = useAuth();

  const navigate = useNavigate();

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
      navigate("/");
    } catch (error) {
      setError(formatFirebaseError(error, currentLocale));
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="form self-center w-full"
      >
        <h1 className="form-title">{currentLocale.auth.signUp}</h1>
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
        <div className="form-field">
          <label htmlFor="display-name">{currentLocale.auth.displayName}</label>
          <input
            ref={nameRef}
            type="text"
            id="display-name"
            name="display-name"
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">{currentLocale.auth.email}</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">{currentLocale.auth.password}</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="password-confirm">
            {currentLocale.auth.confirmPassword}
          </label>
          <input
            ref={passwordConfirmRef}
            type="password"
            id="password-confirm"
            name="password-confirm"
            className="form-input"
          />
        </div>
        <button disabled={loading} type="submit" className="form-button">
          {currentLocale.auth.signUp}
        </button>
      </form>
    </>
  );
};

export default Signup;
