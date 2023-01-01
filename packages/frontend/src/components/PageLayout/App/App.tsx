import { ChakraProvider, HStack } from '@chakra-ui/react';
import GlobalRenders from 'components/GlobalRenders';
import Sidebar from 'components/Sidebar/Sidebar';
import theme from 'styles/theme';
import { ApolloClient, ApolloProvider, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';

interface IApp extends ReturnType<typeof mapStateToProps> {
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

function App(props: IApp) {
  const {
    children,
    auth: { isAuth },
  } = props;
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
}

const mapStateToProps = (state: STATE) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
