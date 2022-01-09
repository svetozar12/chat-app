import { useSelector, useDispatch } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState, InitialState3 } from "../redux/state";

function LoginForm({
  handleSubmit,
}: {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}) {
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  const inputState = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );
  const dispatch = useDispatch();
  return (
    <div style={{ height: "100vh" }} className="login_form">
      <form className="container">
        <h1 className="alert" style={{ color: "red" }}>
          {state.bad}
        </h1>
        <h1>Login</h1>
        <input
          value={inputState.input_username}
          onChange={(e) =>
            dispatch({ type: "SAVE_INPUT_USERNAME", payload: e.target.value })
          }
          type="text"
          name="username"
          placeholder="username ..."
        />
        <input
          value={inputState.input_password}
          onChange={(e) =>
            dispatch({ type: "SAVE_INPUT_PASSWORD", payload: e.target.value })
          }
          type="password"
          name="password"
          placeholder="password ..."
        />
        <button onClick={handleSubmit} type="submit">
          Log In
        </button>
        <div className="clickable">
          <Link href="/register">
            <a className="link" style={{ color: "var(--main-blue)" }}>
              Sign up for chatApp
            </a>
          </Link>
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
          <label style={{ marginLeft: ".25rem" }} htmlFor="checkbox">
            {" "}
            Remember me
          </label>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
