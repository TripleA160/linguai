import { useRef, useState, type FormEvent } from "react";
import { formatFirebaseError } from "../utils/firebase-utils";
import { useAuth } from "../features/auth/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

    if (!nameRef.current.value) inputError.push("Please enter a name.");

    if (!emailRef.current.value) inputError.push("Please enter an email.");

    if (!passwordRef.current.value) inputError.push("Please enter a password.");

    if (passwordRef.current.value && !passwordConfirmRef.current.value)
      inputError.push("Please confirm your password.");

    if (inputError.length > 0) return setError(inputError);

    const password = passwordRef.current.value;
    const passwordError: string[] = [];

    if (password.length < 8)
      passwordError.push("Password must contain at least 8 characters.");

    if (!/^[A-Za-z0-9!@#$%^&*()_\-+=[\]{}|:;"'<>,.?/~`\\]+$/.test(password)) {
      passwordError.push(
        "Password can only use English letters, numbers, and common special characters.",
      );
    }
    if (!/^[A-Za-z]/.test(password)) {
      passwordError.push("Password must start with a letter.");
    }

    if (!/[a-z]/.test(password))
      passwordError.push(
        "Password must contain at least one lowercase character.",
      );
    if (!/[A-Z]/.test(password))
      passwordError.push(
        "Password must contain at least one uppercase character.",
      );

    if (passwordError.length > 0) return setError(passwordError);

    if (password !== passwordConfirmRef.current.value)
      return setError("Passwords do not match.");

    setLoading(true);

    try {
      await signup(emailRef.current.value, password, nameRef.current.value);
      setError(null);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(formatFirebaseError(error));
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="form self-center w-full"
      >
        <h1 className="form-title">Sign Up</h1>
        {error &&
          (Array.isArray(error) && error.length > 1 ? (
            <ul className="error">
              {error.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          ) : (
            <div className="error">{error}</div>
          ))}
        <div className="form-field">
          <label htmlFor="display-name">Name</label>
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
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="password-confirm">Confirm password</label>
          <input
            ref={passwordConfirmRef}
            type="password"
            id="password-confirm"
            name="password-confirm"
            className="form-input"
          />
        </div>
        <button disabled={loading} type="submit" className="form-button">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Signup;
