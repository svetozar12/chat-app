import React, { FC } from 'react';
import Link from 'next/link';
import { Button, GridItem, HStack, SimpleGrid } from '@chakra-ui/react';
import Loading from '../../Loading';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { togglelIsLoading, toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import useThemeColors from 'hooks/useThemeColors';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/cookieNames';
import { useRouter } from 'next/router';
import { useCookie } from 'next-cookie';
import { useGetChatListQuery, useLoginUserMutation } from 'services/generated';
import useProvideAuth from 'hooks/useSession';
import { setAlert } from 'services/redux/reducer/alert/actions';
import { STATE } from 'services/redux/reducer';
import IInputs from 'services/redux/reducer/inputs/state';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const QuickLoginModal: FC<Props> = ({ toggleQuickLogin, inputs, setAlert, togglelIsLoading }) => {
  const { quickLogin, loading } = useQuickLogin(setAlert, inputs, togglelIsLoading, toggleQuickLogin);
  const {
    base: {
      button: { color },
      default: { background },
    },
  } = useThemeColors();

  return (
    <HStack w="full" h="100vh" alignItems="center" justifyContent="center" zIndex="200" pos="absolute" top={0}>
      <SimpleGrid
        gap={4}
        placeItems="center"
        columns={2}
        w={{ base: '95%', md: '80%', lg: '50%', xl: '30%' }}
        bg={background}
        h="40%"
        p={4}
        boxShadow="default"
      >
        <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
          <Button colorScheme={color} w="full" isLoading={loading} spinner={<Loading />} onClick={async () => await quickLogin()}>
            Click me to Quick login
          </Button>
        </GridItem>
        <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
          <Link href="/" passHref>
            <Button colorScheme="blue" w="full" onClick={() => toggleQuickLogin(false)}>
              Sign up
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
    </HStack>
  );
};

const useQuickLogin = (
  setAlertAction: typeof setAlert,
  inputs: IInputs,
  togglelIsLoadingAction: typeof togglelIsLoading,
  toggleQuickLoginAction: typeof toggleQuickLogin,
) => {
  const router = useRouter();
  const cookie = useCookie();
  const [login, { data, loading }] = useLoginUserMutation();
  const { auth } = useProvideAuth();
  const { data: chatListData } = useGetChatListQuery({ variables: { auth } });

  const quickLogin = async (): Promise<void> => {
    try {
      await login({ variables: { username: inputs.input_username, password: inputs.input_password } });
      const { loginUser } = data || {};
      if (loginUser?.__typename === 'Error') setAlertAction(loginUser.message, 'error');
      else {
        const { userId, AccessToken, RefreshToken } = loginUser || {};
        toggleQuickLoginAction(true);
        togglelIsLoadingAction(true);
        const cookies = [
          { name: 'name', value: inputs.input_username, options: { sameSite: 'strict', path: '/' } },
          { name: 'id', value: userId, options: { sameSite: 'strict', path: '/' } },
          { name: ACCESS_TOKEN, value: AccessToken, options: { sameSite: 'strict', path: '/' } },
          { name: REFRESH_TOKEN, loginUser: RefreshToken, options: { sameSite: 'strict', path: '/' } },
        ];

        cookies.forEach((element) => {
          const { name, value, options } = element;
          cookie.set(name, value, { ...(options as any) });
        });

        const { getAllChats } = chatListData || {};
        if (getAllChats?.__typename === 'Error') throw new Error(getAllChats.message);
        const firstChatid = getAllChats?.res[0]._id;

        router.push(`/${firstChatid}`);
      }
    } catch (error) {
      togglelIsLoadingAction(false);
    }
  };
  return { quickLogin, loading };
};

const mapStateToProps = (state: STATE) => ({
  inputs: state.inputs,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglelIsLoading: bindActionCreators(togglelIsLoading, dispatch),
  setAlert: bindActionCreators(setAlert, dispatch),
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickLoginModal);
