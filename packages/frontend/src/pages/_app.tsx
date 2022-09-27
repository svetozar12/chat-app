import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
// services
import { wrapper } from "../services/redux/store";
// layout components
import App from "components/PageLayout/App";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <App cookies={pageProps.cookie}>
      <Component {...pageProps} />
    </App>
  );
};

export default wrapper.withRedux(MyApp);

export { getServerSideProps } from "components/PageLayout/App/App";
