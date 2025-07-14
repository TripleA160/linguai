import { useRef, useState, type FormEvent } from "react";
import { formatFirebaseError } from "../utils/firebase-utils";
import { useAuth } from "../features/auth/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const inputError: string[] = [];

    if (!emailRef.current.value) inputError.push("Please enter an email.");

    if (!passwordRef.current.value) inputError.push("Please enter a password.");

    if (inputError.length > 0) return setError(inputError);

    setLoading(true);

    try {
      await login(emailRef.current!.value, passwordRef.current!.value);
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
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
        <h1 className="form-title">Login</h1>
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
        <button disabled={loading} type="submit" className="form-button">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
