import { useDispatch, useSelector } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState, InitialState3 } from "redux/state";
import styled from "@emotion/styled";
import { Alerts } from "components/Alerts/Alerts";
import { css } from "@emotion/css";
import {
  Form,
  Button,
  Input,
  Form_header,
  Label_container,
} from "components/LoginForm/LoginForm";

const Label_button = styled.label`
  margin: 0 2rem;
  border-radius: 5px;
  width: 4rem;
  text-align: center;
  padding: 0.5rem;
  color: var(--main-white);
  background: rgba(0, 105, 217, 0.5);
  cursor: pointer;
`;

function RegisterForm({
  quickLogin,
  handleSubmit,
}: {
  quickLogin(): void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}) {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  const inputState = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

  return (
    <div style={{ height: "100vh", flexDirection: "column" }} className="flex">
      {(state.good || state.bad) && <Alerts />}
      <Form_header>Register</Form_header>
      <Form style={{ height: "70vh" }}>
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
        <Label_container>
          <label>Email</label>
          <Input
            value={inputState.input_email}
            onChange={(e) =>
              dispatch({ type: "SAVE_INPUT_EMAIL", payload: e.target.value })
            }
            type="email"
            name="email"
            placeholder="email ..."
          />
        </Label_container>
        <Label_container>
          <label>Gender</label>
          <div className="flex">
            <Input
              className={css`
                opacity: 0;
                position: fixed;
                width: 0;
              `}
              onChange={(e) =>
                dispatch({
                  type: "SAVE_INPUT_GENDER",
                  payload: e.target.value,
                })
              }
              type="radio"
              id="Male"
              name="gender"
              value="Male"
            />
            <Label_button htmlFor="Male">Male</Label_button>
            <div>
              <Input
                className={css`
                  opacity: 0;
                  position: fixed;
                  width: 0;
                `}
                onChange={(e) =>
                  dispatch({
                    type: "SAVE_INPUT_GENDER",
                    payload: e.target.value,
                  })
                }
                type="radio"
                name="gender"
                id="Female"
                value="Female"
              />
              <Label_button htmlFor="Female">Female</Label_button>
            </div>
          </div>
        </Label_container>
        <Button onClick={handleSubmit} type="submit">
          Register
        </Button>
        <Link href="/login">
          <a className="link" style={{ color: "var(--button-blue)" }}>
            Already have an account?
          </a>
        </Link>
        {state.loginPrompt && (
          <div
            className={css`
              cursor: pointer;
              @media (max-width: 431px) {
                font-size: 0.689rem;
              } ;
            `}
            onClick={quickLogin}
          >
            <h2>Click me to Quick login</h2>
          </div>
        )}
      </Form>
    </div>
  );
}

export default RegisterForm;
