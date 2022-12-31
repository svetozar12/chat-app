import { Flex, FormLabel, HStack, Input, Button, Checkbox, SimpleGrid, GridItem, FormErrorMessage, FormControl } from '@chakra-ui/react';
// hooks
import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
// components
import FormWrapper from 'components/FormWrapper';
import DefaultLink from 'services/chat-ui/DefaultLink';
import { useFormik } from 'formik';
import { LoginSchema } from 'utils/validation';
import { ILogin } from 'pages';
import useThemeColors from 'hooks/useThemeColors';
import Loading from '../Loading';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { setInputPassword, setInputUsername } from 'services/redux/reducer/inputs/actions';
import { togglelIsLoading } from 'services/redux/reducer/toggles/actions';
import { setAlert } from 'services/redux/reducer/alert/actions';
import { setRememberMe } from 'services/redux/reducer/auth/actions';
import { useGetChatListQuery, useLoginUserMutation } from 'services/generated';
import { handleSubmit } from 'components/LoginForm/utils';
import useProvideAuth from 'hooks/useSession';

interface ILoginForm extends ILogin, ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}
interface IRenderInputs {
  label: string;
  props: {
    type: string;
    name: 'username' | 'password';
    color: string;
    placeholder: string;
    _placeholder: any;
    boxShadow: string;
  };
}

function LoginForm(props: ILoginForm) {
  const { callback, auth, isLoading, setInputUsername, setInputPassword, togglelIsLoading, setAlert } = props;
  const router = useRouter();
  const cookie = useCookie();
  const { auth: authObj } = useProvideAuth();
  const [loginUserMutation, { data }] = useLoginUserMutation();
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

  const renderInputs: IRenderInputs[] = [
    {
      label: 'Username',
      props: {
        type: 'text',
        name: 'username',
        color,
        placeholder: 'username ...',
        boxShadow: `0px 0px 2px 0px ${color}`,
        _placeholder: { color: color, opacity: 0.5 },
      },
    },
    {
      label: 'Password',
      props: {
        type: 'password',
        name: 'password',
        color,
        boxShadow: `0px 0px 2px 0px ${color}`,
        placeholder: 'password ...',
        _placeholder: { color: color, opacity: 0.5 },
      },
    },
  ];

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(
        values,
        auth,
        cookie,
        router,
        callback,
        { loginUserMutation, data },
        {
          setAlertSetter: setAlert,
          setInputPasswordSetter: setInputPassword,
          setInputUsernameSetter: setInputUsername,
          togglelIsLoadingSetter: togglelIsLoading,
        },
        firstChatid as string,
        () => refetch({ auth: authObj }),
      );
      resetForm();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <FormWrapper handleSubmit={formik.handleSubmit} type="Login">
      <>
        {renderInputs.map((element, index) => {
          const { props } = element;
          const { name } = props;
          const isInvalid = Boolean(formik.errors[name] && formik.touched[name]);

          return (
            <FormControl isInvalid={isInvalid} key={index}>
              <FormLabel>{element.label}</FormLabel>
              <Input {...formik.getFieldProps(name)} variant="FormInput" {...props} />
              {formik.errors[name] && (
                <FormErrorMessage fontSize="xl" fontWeight="semibold">
                  {formik.errors[name]}
                </FormErrorMessage>
              )}
            </FormControl>
          );
        })}
      </>

      <Flex w="full" alignItems="center" justifyContent="center">
        <Button isLoading={isLoading} spinner={<Loading />} colorScheme={btnCollor} w="60%" type="submit">
          Log In
        </Button>
      </Flex>
      <HStack spacing="5" alignItems="center" justifyContent="center" w="full">
        <SimpleGrid gap={5} w="full" columns={2}>
          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <DefaultLink href="/register" text="Sign up for chatApp" />
          </GridItem>
          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <HStack alignItems="center" justifyContent="center">
              <Checkbox
                variant="solid"
                border="1px"
                cursor="pointer"
                data-testid="checkbox"
                type="checkbox"
                id="checkbox"
                checked={auth.remember_me}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <FormLabel cursor="pointer" htmlFor="checkbox">
                Remember me
              </FormLabel>
            </HStack>
          </GridItem>
        </SimpleGrid>
      </HStack>
    </FormWrapper>
  );
}

const mapStateToProps = (state: STATE) => ({
  auth: state.auth,
  isLoading: state.toggle.toggeleIsLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setInputUsername: bindActionCreators(setInputUsername, dispatch),
  setInputPassword: bindActionCreators(setInputPassword, dispatch),
  togglelIsLoading: bindActionCreators(togglelIsLoading, dispatch),
  setAlert: bindActionCreators(setAlert, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
