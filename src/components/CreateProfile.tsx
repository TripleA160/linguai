import { useRef, useState, type FormEvent } from "react";
import { formatFirebaseError } from "../utils/firebase-utils";
import { useAuth } from "../features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../features/firestore/useFirestore";

const CreateProfile = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const displayNameRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { updateProfileInAuth, currentUser } = useAuth();
  const { updateProfileInDB } = useFirestore();

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (usernameRef.current!.value === null)
      return setError("Please enter a username.");

    if (displayNameRef.current!.value === null)
      return setError("Please enter a display name.");

    setLoading(true);

    try {
      await updateProfileInAuth({ displayName: displayNameRef.current!.value });
      await updateProfileInDB({
        username: usernameRef.current!.value,
        displayName: displayNameRef.current!.value,
      });
      console.log(usernameRef.current!.value);
      console.log(displayNameRef.current!.value);
      console.log(currentUser);
      setError(null);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setError(formatFirebaseError(error));
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Create Profile</h1>
        {error && <div className="form-error">{error}</div>}
        <div className="form-field">
          <label htmlFor="username">Username:</label>
          <input
            ref={usernameRef}
            type="text"
            id="username"
            name="username"
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="display-name">Display name:</label>
          <input
            ref={displayNameRef}
            type="text"
            id="display-name"
            name="display-name"
            required
            className="form-input"
          />
        </div>
        <button disabled={loading} type="submit" className="form-button">
          Create
        </button>
      </form>
    </>
  );
};

export default CreateProfile;
