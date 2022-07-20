import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
// services
import { wrapper } from "../services/redux/store";
// layout components
import App from "components/PageLayout/App";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
};

export default wrapper.withRedux(MyApp);
