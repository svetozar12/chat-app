import { Box, Button, Heading, Spinner, VStack } from '@chakra-ui/react';
import Loading from 'components/Loading';
import useThemeColors from 'hooks/useThemeColors';
import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { setIsAuth, signOut } from 'services/redux/reducer/auth/actions';
import { IAuth } from 'services/redux/reducer/auth/state';
import sdk from 'services/sdk';
import { getAuth } from 'utils/authMethods';

interface ILogout {
  auth: IAuth;
  signOut: typeof signOut;
  setIsAuth: typeof setIsAuth;
}

const Logout = (props: ILogout) => {
  const { signOut, setIsAuth, auth } = props;
  const [isLoading, setIsLoading] = useState(true);
  const {
    base: {
      form: { background },
    },
  } = useThemeColors();
  const router = useRouter();
  const cookie = useCookie();

  const deleteCookies = async () => {
    getAuth();
    const cookies = cookie.getAll();
    await sdk.auth.logout({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') } });
    for (const key in cookies) cookie.remove(key);
    setIsAuth(!auth.isAuth);
    signOut();
    router.push('/');
    setIsLoading(false);
  };

  useEffect(() => {
    deleteCookies();
  }, []);

  return (
    <VStack h="100vh" justify="center">
      <VStack bg={background} p="10">
        {isLoading && <Loading size="xl" />}
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state: STATE) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: bindActionCreators(signOut, dispatch),
  setIsAuth: bindActionCreators(setIsAuth, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
