import { useDispatch, useSelector } from "react-redux";
import Link from "next/dist/client/link";
import { css } from "@emotion/css";
import { Button, Input, Label_container, Label_button } from "../styledComponents";
import QuickLogin_Modal from "./QuickLogin_Modal";
// services
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import ISave_inputState from "../../services/redux/reducer/save_inputReducer/state";
import FormWrapper from "../FormWrapper";

interface IRegisterForm {
  // eslint-disable-next-line no-unused-vars
  quickLogin: () => Promise<false | undefined>;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

function RegisterForm({ quickLogin, handleSubmit }: IRegisterForm) {
  const dispatch = useDispatch();

  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const inputState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  return (
    <div title="register_form" style={{ height: "100vh", flexDirection: "column" }} className="flex">
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
      </FormWrapper>

      {state.loginPrompt && <QuickLogin_Modal quickLogin={quickLogin} />}
    </div>
  );
}

export default RegisterForm;
