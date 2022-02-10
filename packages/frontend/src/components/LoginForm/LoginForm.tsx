import { useSelector, useDispatch } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState, InitialState3 } from "redux/state";
import styled from "@emotion/styled";

const Input = styled.input`
  width: 60%;
  height: 2rem;
  margin: 0.5rem 0;
  border: 1px solid var(--input-border-color);
  border-radius: 5px;
  transition: 0.3s;
  padding: 1.3rem 0.9rem;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 40px;
`;

const Form = styled.form`
  width: 40%;
  height: 90vh;
  margin: 1rem 0;
  padding: 3rem;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 15px black;
  @media (max-width: 1010px) {
    width: 70%;
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  border-radius: 5px;
  width: 60%;
  background-color: var(--main-black);
  color: var(--main-white);
  border: 1px solid var(--input-border-color);
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
  font-size: 1rem;
`;

const Alert = styled.h2`
  font-size: 1.9rem;
  color: red;
`;

const Clickable = styled.div`
  display: flex;
  align-items: center;
`;

const Link_anchor = styled.a`
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  margin: 1rem;
  font-size: 1.2rem;
  @media (max-width: 431px) {
    text-align: center;
  }
`;
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
    <div style={{ height: "100vh" }} className="flex">
      <Form>
        <Alert>{state.bad}</Alert>
        <h1>Login</h1>
        <Input
          value={inputState.input_username}
          onChange={(e) =>
            dispatch({ type: "SAVE_INPUT_USERNAME", payload: e.target.value })
          }
          type="text"
          name="username"
          placeholder="username ..."
        />
        <Input
          value={inputState.input_password}
          onChange={(e) =>
            dispatch({ type: "SAVE_INPUT_PASSWORD", payload: e.target.value })
          }
          type="password"
          name="password"
          placeholder="password ..."
        />
        <Button onClick={handleSubmit} type="submit">
          Log In
        </Button>
        <Clickable>
          <Link href="/register">
            <Link_anchor className="link" style={{ color: "var(--main-blue)" }}>
              Sign up for chatApp
            </Link_anchor>
          </Link>
          <CheckBox
            data-testid="checkbox"
            type="checkbox"
            id="checkbox"
            checked={state.remember_me}
            onChange={(e) =>
              dispatch({
                type: "REMEMBER_ME_CHECK",
                payload: e.target.checked,
              })
            }
          />
          <label style={{ marginLeft: ".25rem" }} htmlFor="checkbox">
            {" "}
            Remember me
          </label>
        </Clickable>
      </Form>
    </div>
  );
}

export default LoginForm;
