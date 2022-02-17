import { useSelector, useDispatch } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState, InitialState3 } from "../../redux/state";
import styled from "@emotion/styled";
import { Alerts } from "../Alerts/Alerts";
import { css } from "@emotion/css";
export const Input = styled.input`
  width: 100%;
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

export const Form = styled.form`
  width: 40%;
  height: 50vh;
  padding: 3rem;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1);
  @media (max-width: 1010px) {
    width: 70%;
  }
`;

export const Button = styled.button`
  margin-top: 1rem;
  border-radius: 5px;
  width: 60%;
  background-color: var(--button-blue);
  color: var(--main-white);
  border: 1px solid var(--input-border-color);
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
  font-size: 1rem;
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
`;

export const Label_container = styled.div`
  dispay: flex;
  flex-direction: collumn;
  width: 60%;
`;

export const Form_header = styled.h1`
  padding: 1rem;
  height: auto;
  text-align: center;
  margin: 0;
  width: 40%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: var(--main-white);
  background: var(--form-gray);
  @media (max-width: 1010px) {
    width: 70%;
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
    <div style={{ height: "100vh", flexDirection: "column" }} className="flex">
      {(state.good || state.bad) && <Alerts />}
      <div style={{ width: "100%", height: "3rem" }}></div>
      <Form_header>Login</Form_header>
      <Form>
        <Label_container>
          <label>Username</label>
          <Input
            value={inputState.input_username}
            onChange={(e) =>
              dispatch({ type: "SAVE_INPUT_USERNAME", payload: e.target.value })
            }
            type="text"
            name="username"
            placeholder="username ..."
          />
        </Label_container>
        <Label_container>
          <label>Password</label>
          <Input
            value={inputState.input_password}
            onChange={(e) =>
              dispatch({ type: "SAVE_INPUT_PASSWORD", payload: e.target.value })
            }
            type="password"
            name="password"
            placeholder="password ..."
          />
        </Label_container>
        <Button onClick={handleSubmit} type="submit">
          Log In
        </Button>
        <Clickable>
          <Link href="/register">
            <Link_anchor
              className="link"
              style={{ color: "var(--button-blue)" }}
            >
              Sign up for chatApp .
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
