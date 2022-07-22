import GlobalRenders from "components/GlobalRenders";
import React from "react";
import theme from "styles/theme";
import SessionProvider from "utils/SessionProvider";
import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from "@chakra-ui/react";

interface IApp {
  children: JSX.Element | JSX.Element[];
  cookies: string;
}

const App = ({ children, cookies }: IApp) => {
  const colorModeManager = typeof cookies === "string" ? cookieStorageManagerSSR(cookies) : localStorageManager;
  return (
    <SessionProvider>
      <GlobalRenders />
      <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
        {children}
      </ChakraProvider>
    </SessionProvider>
  );
};

export function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
}

export default App;
