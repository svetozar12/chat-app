import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
// services
import { wrapper } from "../services/redux/store";
import App from "../components/App";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  return <App Component={Component} pageProps={pageProps} />;
};

export default wrapper.withRedux(MyApp);
