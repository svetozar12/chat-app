import React from "react";
import { useSelector } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
// components
import { Form, Form_header } from "../styledComponents";
import Alerts from "../Alerts";

interface IFormWrapper {
  children: JSX.Element | JSX.Element[];
}

const FormWrapper = ({ children }: IFormWrapper) => {
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  return (
    <>
      {(state.good || state.bad) && <Alerts />}
      <div style={{ width: "100%", height: "3rem" }}></div>
      <Form_header>Login</Form_header>
      <Form>{children}</Form>
    </>
  );
};

export default FormWrapper;
