import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
// services
import { wrapper } from "../services/redux/store";
import SessionProvider from "../utils/SessionProvider";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import GlobalRenders from "../components/GlobalRenders";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <SessionProvider>
      <GlobalRenders />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default wrapper.withRedux(MyApp);
