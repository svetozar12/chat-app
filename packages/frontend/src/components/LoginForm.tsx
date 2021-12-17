import { useSelector, useDispatch } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState } from "../redux/state";

function LoginForm({
  handleSubmit,
}: {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}) {
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );
  const dispatch = useDispatch();
  return (
    <div className="login-box">
      <form style={{ height: "100vh" }} className="container">
        <h1 className="alert" style={{ color: "red" }}>
          {state.bad}
        </h1>
        <h1>Login</h1>
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
        <div className="clickable">
          <Link href="/register">
            <a className="link" style={{ color: "var(--main-blue)" }}>
              Create an account.
            </a>
          </Link>
          <label htmlFor="checkbox">
            {" "}
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) =>
                dispatch({
                  type: "REMEMBER_ME_CHECK",
                  payload: e.target.checked,
                })
              }
              style={{ width: "20px", height: "40px" }}
            />
            Remember me
          </label>
        </div>
        <button onClick={handleSubmit} type="submit">
          login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
