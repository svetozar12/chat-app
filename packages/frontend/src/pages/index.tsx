import React from "react";
import LoginForm from "../components/LoginForm";
// services
import { isAlreadyAuth } from "../utils/auth";

function Login() {
  return <LoginForm />;
}

export const getServerSideProps = isAlreadyAuth();

export default Login;
