import { useSelector } from "react-redux";

const alerts = useSelector(
  (state: { authReducer: { bad: string } }) => state.authReducer,
);

function LoginForm() {
  return (
    <div>
      <form style={{ height: "100vh" }} className="container">
        <h1 className="alert" style={{ color: "red" }}>
          {alerts.bad}
        </h1>
        <h1>Login</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="username"
          placeholder="username ..."
        />
        <div className="clickable">
          <Link href="/register">
            <a className="link" style={{ color: "var(--main-blue)" }}>
              Sign up
            </a>
          </Link>
          <label htmlFor="checkbox">
            {" "}
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => setChecked(e.target.checked)}
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
