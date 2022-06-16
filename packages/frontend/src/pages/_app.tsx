import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
// services
import { wrapper } from "../services/redux/store";
import App from "../components/App";
import withAuthSync from "../utils/auth";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  return <App Component={Component} pageProps={pageProps} />;
};
// export const getServerSideProps = withAuthSync();
export default wrapper.withRedux(MyApp);
