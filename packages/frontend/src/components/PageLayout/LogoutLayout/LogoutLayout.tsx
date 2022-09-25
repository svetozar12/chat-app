import { Button, Heading, VStack } from '@chakra-ui/react';
import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { signOut } from 'services/redux/reducer/auth/actions';
import sdk from 'services/sdk';
import { getAuth } from 'utils/authMethods';

interface ILogout {
  signOut: typeof signOut;
}

const Logout = (props: ILogout) => {
  const { signOut } = props;
  const router = useRouter();
  const cookie = useCookie();

  const deleteCookies = async () => {
    getAuth();
    const cookies = cookie.getAll();
    await sdk.auth.logout({ userId: cookie.get('id'), AccessToken: cookie.get('token') });
    for (const key in cookies) cookie.remove(key);
    signOut();
  };

  useEffect(() => {
    deleteCookies();
  }, []);

  return (
    <VStack h="100vh" justify="center">
      <Heading>You have been logged out</Heading>
      <Button onClick={() => router.push('/')}>Sign in again</Button>
    </VStack>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: bindActionCreators(signOut, dispatch),
});

export default connect(null, mapDispatchToProps)(Logout);
