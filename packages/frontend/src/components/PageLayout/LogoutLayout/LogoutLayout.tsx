import { VStack } from '@chakra-ui/react';
import Loading from 'components/Loading';
import useThemeColors from 'hooks/useThemeColors';
import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AuthModel, useLogoutMutation } from 'services/generated';
import { STATE } from 'services/redux/reducer';
import { setIsAuth, signOut } from 'services/redux/reducer/auth/actions';
import { IAuth } from 'services/redux/reducer/auth/state';
import { getAuth } from 'utils/authMethods';

interface ILogout {
  auth: IAuth;
  signOut: typeof signOut;
  setIsAuth: typeof setIsAuth;
}

const Logout = (props: ILogout) => {
  const { signOut, setIsAuth, auth: authProps } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [logout] = useLogoutMutation();
  const {
    base: {
      form: { background },
    },
  } = useThemeColors();
  const router = useRouter();
  const cookie = useCookie();

  const deleteCookies = async () => {
    getAuth().then(async () => {
      const auth: AuthModel = { userId: cookie.get('id'), AccessToken: cookie.get('token') };
      await logout({ variables: { auth } });
    });
    const cookies = cookie.getAll();
    for (const key in cookies) cookie.remove(key);
    setIsAuth(!authProps.isAuth);
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
