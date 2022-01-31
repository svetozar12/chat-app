import { useDispatch, useSelector } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState, InitialState3 } from "../redux/state";
import styled from "@emotion/styled";

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

const Input = styled.input`
  width: 60%;
  height: 2rem;
  margin: 0.5rem 0;
  border: 1px solid var(--input-border-color);
  border-radius: 5px;
  transition: 0.3s;
  padding: 1.3rem 0.9rem;
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
  const Alert = styled.h2`
    font-size: 1.9rem;
    color: ${state.good ? "green" : "red"};
  `;
  const inputState = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

  return (
    <div style={{ height: "100vh" }} className="flex">
      <Form>
        <Alert>{state.good || state.bad}</Alert>
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
