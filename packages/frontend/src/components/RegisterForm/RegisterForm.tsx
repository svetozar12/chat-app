import { useDispatch, useSelector } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState, InitialState3 } from "redux/state";
import styled from "@emotion/styled";
import { Alerts } from "components/Alerts/Alerts";
import { Form, Button, Input } from "components/LoginForm/LoginForm";

const QuickLogin = styled.div`
  cursor: pointer;
  @media (max-width: 431px) {
    font-size: 0.689rem;
  } ;
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
      <Alerts />
      <Form>
        <h1>Register</h1>
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
        <Input
          value={inputState.input_email}
          onChange={(e) =>
            dispatch({ type: "SAVE_INPUT_EMAIL", payload: e.target.value })
          }
          type="email"
          name="email"
          placeholder="email ..."
        />
        <div className="input_gender">
          <div>
            <label htmlFor="Male">Male</label>
            <Input
              onChange={(e) =>
                dispatch({
                  type: "SAVE_INPUT_GENDER",
                  payload: e.target.value,
                })
              }
              type="radio"
              name="gender"
              id="Male"
              value="Male"
            />
          </div>
          <div>
            <label htmlFor="Female">Female</label>
            <Input
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
          </div>
          <div>
            <label htmlFor="Others">Others</label>
            <Input
              onChange={(e) =>
                dispatch({
                  type: "SAVE_INPUT_GENDER",
                  payload: e.target.value,
                })
              }
              type="radio"
              name="gender"
              id="Others"
              value="Others"
            />
          </div>
        </div>
        <Button onClick={handleSubmit} type="submit">
          Register
        </Button>
        <Link href="/login">
          <a className="link" style={{ color: "var(--main-blue)" }}>
            Already have an account?
          </a>
        </Link>
        {state.loginPrompt && (
          <QuickLogin onClick={quickLogin}>
            <h2>Click me to Quick login</h2>
          </QuickLogin>
        )}
      </Form>
    </div>
  );
}

export default RegisterForm;
