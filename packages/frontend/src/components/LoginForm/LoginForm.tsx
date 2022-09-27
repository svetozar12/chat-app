import { useSelector, useDispatch } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import ISave_inputState from "../../services/redux/reducer/save_inputReducer/state";
import { Label_container, Button, Input } from "../styledComponents/index";
import Link from "next/dist/client/link";
import styled from "@emotion/styled";
import FormWrapper from "../FormWrapper";

const CheckBox = styled.input`
  width: 20px;
  height: 40px;
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

function LoginForm({
  handleSubmit,
}: {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}) {
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  const inputState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  const dispatch = useDispatch();

  return (
    <div style={{ height: "100vh", flexDirection: "column" }} className="flex">
      <FormWrapper>
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
        <Clickable>
          <Link href="/register">
            <Link_anchor className="link" style={{ color: "var(--button-blue)" }}>
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
      </FormWrapper>
    </div>
  );
}

export default LoginForm;
