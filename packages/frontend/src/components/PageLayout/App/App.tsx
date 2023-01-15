import { ChakraProvider, HStack } from '@chakra-ui/react';
import GlobalRenders from 'components/GlobalRenders';
import Sidebar from 'components/Sidebar/Sidebar';
import theme from 'styles/theme';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { setWSConnection } from 'services/redux/reducer/websocket/actions';
import { FC, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface IApp extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  children: JSX.Element | JSX.Element[];
}

const gqlUrl = `${process.env.NEXT_PUBLIC_GQL_PROTOCOL}://${process.env.NEXT_PUBLIC_GQL_HOST}:${process.env.NEXT_PUBLIC_GQL_PORT}/graphql`;
export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: createHttpLink({
    uri: gqlUrl,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

const App: FC<IApp> = ({ auth: { isAuth }, children, setWs }) => {
  useWs(setWs);
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <GlobalRenders />
        {isAuth ? (
          <HStack>
            <Sidebar />
            {children}
          </HStack>
        ) : (
          children
        )}
      </ChakraProvider>
    </ApolloProvider>
  );
};

const mapStateToProps = (state: STATE) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setWs: bindActionCreators(setWSConnection, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const useWs = (setWSConnectionSetter: typeof setWSConnection) => {
  useEffect(() => {
    const socketConnect: Socket = io('http://localhost:4000', {
      transports: ['websocket'],
    });

    setWSConnectionSetter(socketConnect);
    return () => {
      socketConnect.disconnect();
    };
  }, []);
};
