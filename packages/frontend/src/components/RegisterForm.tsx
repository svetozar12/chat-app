import { useDispatch, useSelector } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState } from "../redux/state";

function RegisterForm({
  quickLogin,
  handleSubmit,
}: {
  quickLogin(): void;
  handleSubmit(e: React.MouseEvent<HTMLButtonElement>): Promise<void>;
}) {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  return (
    <div>
      <form style={{ height: "100vh" }} className="container">
        <h2
          className="alert"
          style={state.good ? { color: "green" } : { color: "red" }}
        >
          {state.good || state.bad}
        </h2>
        <h1>Register</h1>
        <input
          value={state.input_username}
          onChange={(e) =>
            dispatch({ type: "SAVE_INPUT_USERNAME", payload: e.target.value })
          }
          type="text"
          name="username"
          placeholder="username ..."
        />
        <input
          value={state.input_password}
          onChange={(e) =>
            dispatch({ type: "SAVE_INPUT_PASSWORD", payload: e.target.value })
          }
          type="password"
          name="password"
          placeholder="password ..."
        />
        <Link href="/login">
          <a className="link" style={{ color: "var(--main-blue)" }}>
            Log In.
          </a>
        </Link>
        <button onClick={handleSubmit} type="submit">
          register
        </button>
        {state.loginPrompt && (
          <div
            onClick={quickLogin}
            style={{ cursor: "pointer" }}
            className="container quick_login"
          >
            <h2>Click me to Quick login</h2>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
