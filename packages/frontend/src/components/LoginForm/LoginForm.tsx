import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
// components
import FormWrapper from 'components/FormWrapper';
import { ILogin } from 'pages';
import useThemeColors from 'hooks/useThemeColors';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { togglelIsLoading } from 'services/redux/reducer/toggles/actions';
import { setAlert } from 'services/redux/reducer/alert/actions';
import { useGetChatListQuery, useLoginUserMutation } from 'services/generated';
import { handleSubmit, renderInputs } from 'components/LoginForm/utils';
import useProvideAuth from 'hooks/useSession';
import { FC } from 'react';
import { DefaultLink } from 'services/chat-ui';
import { Flex, Heading } from '@chakra-ui/react';

interface ILoginForm extends ILogin, ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}
export type FormValues = { username: string; password: string };

const LoginForm: FC<ILoginForm> = (props) => {
  const { callback, auth, togglelIsLoading, setAlert } = props;
  const router = useRouter();
  const cookie = useCookie();
  const { auth: authObj } = useProvideAuth();
  const [loginUserMutation, { data, loading }] = useLoginUserMutation();
  const { data: chatListData, refetch } = useGetChatListQuery({ variables: { auth: authObj } });
  const { getAllChats } = chatListData || {};
  if (getAllChats?.__typename === 'Error') throw new Error(getAllChats.message);
  const firstChatid = getAllChats?.res[0]._id;
  const {
    base: {
      default: { color },
      button: { color: btnCollor },
    },
  } = useThemeColors();

  return (
    <FormWrapper
      onSubmit={(values: FormValues) =>
        handleSubmit(
          values,
          auth,
          cookie,
          router,
          callback,
          { loginUserMutation, data },
          {
            setAlertSetter: setAlert,
            togglelIsLoadingSetter: togglelIsLoading,
          },
          firstChatid as string,
          () => refetch({ auth: authObj }),
        )
      }
      header={
        <Flex w="full" justifyContent="center" gap={2} mb="2" flexDir="column">
          <Heading>Login</Heading>
          <DefaultLink href="/register" text="Already have an account?" />
        </Flex>
      }
      fields={renderInputs(color)}
      buttons={[{ value: 'Login', props: { colorScheme: btnCollor, w: '30%', type: 'submit' } }]}
    />
  );
};

const mapStateToProps = (state: STATE) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglelIsLoading: bindActionCreators(togglelIsLoading, dispatch),
  setAlert: bindActionCreators(setAlert, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
