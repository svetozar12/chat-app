import { ChakraProvider, HStack } from '@chakra-ui/react';
import GlobalRenders from 'components/GlobalRenders';
import Sidebar from 'components/Sidebar/Sidebar';
import { useCookie } from 'next-cookie';
import theme from 'styles/theme';
import SessionProvider from 'utils/SessionProvider';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';

interface IApp extends ReturnType<typeof mapStateToProps> {
  children: JSX.Element | JSX.Element[];
}

const gqlUrl = `${process.env.NEXT_PUBLIC_GQL_PROTOCOL}://${process.env.NEXT_PUBLIC_GQL_HOST}:${process.env.NEXT_PUBLIC_GQL_PORT}/graphql`;
export const client = new ApolloClient({
  uri: gqlUrl,
  cache: new InMemoryCache(),
});

function App(props: IApp) {
  const {
    children,
    auth: { isAuth },
  } = props;
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <GlobalRenders />
        <ChakraProvider theme={theme}>
          {isAuth ? (
            <HStack>
              <Sidebar />
              {children}
            </HStack>
          ) : (
            children
          )}
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

const mapStateToProps = (state: STATE) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
