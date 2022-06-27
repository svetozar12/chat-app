import { NextPage } from "next";
import React from "react";
import LoginForm from "../components/LoginForm";
// services
import { isAlreadyAuth } from "../utils/auth";

export interface ILogin {
  cookie: string;
  callback: string;
}

const Login: NextPage<ILogin> = (props) => {
  return <LoginForm {...props} />;
};

export const getServerSideProps = isAlreadyAuth();

export default Login;
