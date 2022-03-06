import { useDispatch, useSelector } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState, InitialState3 } from "../../redux/state";
import Alerts from "../Alerts";
import { css } from "@emotion/css";
import { Form, Button, Input, Form_header, Label_container, Label_button } from "../styledComponents";
import QuickLogin_Modal from "./QuickLogin_Modal";

function RegisterForm({
  quickLogin,
  handleSubmit,
}: {
  quickLogin(): void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}) {
  const dispatch = useDispatch();
  const state = useSelector((state: { authReducer: InitialState }) => state.authReducer);

  const inputState = useSelector((state: { saveInputReducer: InitialState3 }) => state.saveInputReducer);

  return (
    <div title="register_form" style={{ height: "100vh", flexDirection: "column" }} className="flex">
      {(state.good || state.bad) && <Alerts />}
      <Form_header>Register</Form_header>
      <Form style={{ height: "70vh" }}>
        <Label_container>
          <label>Username</label>
          <Input
            value={inputState.input_username}
            onChange={(e) => dispatch({ type: "SAVE_INPUT_USERNAME", payload: e.target.value })}
            type="text"
            name="username"
            placeholder="username ..."
          />
        </Label_container>
        <Label_container>
          <label>Password</label>
          <Input
            value={inputState.input_password}
            onChange={(e) => dispatch({ type: "SAVE_INPUT_PASSWORD", payload: e.target.value })}
            type="password"
            name="password"
            placeholder="password ..."
          />
        </Label_container>
        <Label_container>
          <label>Email</label>
          <Input
            value={inputState.input_email}
            onChange={(e) => dispatch({ type: "SAVE_INPUT_EMAIL", payload: e.target.value })}
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
        <Link href="/">
          <a className="link" style={{ color: "var(--button-blue)" }}>
            Already have an account?
          </a>
        </Link>
      </Form>
      {state.loginPrompt && <QuickLogin_Modal quickLogin={quickLogin} />}
    </div>
  );
}

export default RegisterForm;
