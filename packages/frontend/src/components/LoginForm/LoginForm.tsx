import { useSelector, useDispatch } from "react-redux";
import Link from "next/dist/client/link";
import { InitialState, InitialState3 } from "../../redux/state";
import { Label_container, Form_header, Form, Button, Input } from "../styledComponents";
import { Alerts } from "../Alerts/Alerts";
import { css } from "@emotion/react";
import React from "react";

// eslint-disable-next-line no-unused-vars
function LoginForm({ handleSubmit }: { handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> }) {
  const state = useSelector((state: { authReducer: InitialState }) => state.authReducer);

  const inputState = useSelector((state: { saveInputReducer: InitialState3 }) => state.saveInputReducer);
  const dispatch = useDispatch();

  return (
    <div css={css`height: "100vh", flex-direction: "column"`} className="flex">
      {(state.good || state.bad) && <Alerts />}
      <div style={{ width: "100%", height: "3rem" }}></div>
      <Form_header>Login</Form_header>
      <Form>
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
        <Button onClick={handleSubmit} type="submit">
          Log In
        </Button>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/register">
            <a
              className="link"
              css={css`
                text-decoration: none;
                cursor: pointer;
                border: 1px solid transparent;
                margin: 1rem;
                color: "var(--button-blue)";
              `}
            >
              Sign up for chatApp .
            </a>
          </Link>
          <input
            css={css`
              width: 20px;
              height: 40px;
            `}
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
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
