import { ChakraProvider, HStack } from '@chakra-ui/react';
import GlobalRenders from 'components/GlobalRenders';
import Sidebar from 'components/Sidebar/Sidebar';
import { useCookie } from 'next-cookie';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { setIsAuth } from 'services/redux/reducer/auth/actions';
import { IAuth } from 'services/redux/reducer/auth/state';
import theme from 'styles/theme';
import SessionProvider from 'utils/SessionProvider';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

interface IApp {
  children: JSX.Element | JSX.Element[];
  auth: IAuth;
  setIsAuth: typeof setIsAuth;
}

function App(props: IApp) {
  const { auth, children, setIsAuth } = props;
  const cookie = useCookie();
  const gqlUrl = `${process.env.NEXT_PUBLIC_GQL_PROTOCOL}://${process.env.NEXT_PUBLIC_GQL_HOST}:${process.env.NEXT_PUBLIC_GQL_PORT}/graphql`;
  const client = new ApolloClient({
    uri: gqlUrl,
    cache: new InMemoryCache(),
  });

  const checkAuth = async () => {
    return setIsAuth(!!cookie.get('id'));
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <GlobalRenders />
        <ChakraProvider theme={theme}>
          {!!cookie.get('id') ? (
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setIsAuth: bindActionCreators(setIsAuth, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
