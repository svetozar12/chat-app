import { ChakraProvider } from '@chakra-ui/react';
import GlobalRenders from 'components/GlobalRenders';
import React from 'react';
import theme from 'styles/theme';
import SessionProvider from 'utils/SessionProvider';
import { ApolloProvider } from '@apollo/client';
import { client } from 'services/sdk';

interface IApp {
  children: JSX.Element | JSX.Element[];
}

function App({ children }: IApp) {
  return (
    <SessionProvider>
      <GlobalRenders />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  );
}

export default App;
