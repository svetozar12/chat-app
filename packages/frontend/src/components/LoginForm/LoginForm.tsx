import React from 'react';
import generic from 'utils/generic';
import {
  Flex,
  FormLabel,
  HStack,
  Input,
  Button,
  Checkbox,
  SimpleGrid,
  GridItem,
  FormErrorMessage,
  FormControl,
  useColorModeValue,
} from '@chakra-ui/react';
// hooks
import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
// components
import FormWrapper from 'services/chat-ui/FormWrapper';
import DefaultLink from 'services/chat-ui/DefaultLink';
import { useFormik } from 'formik';
import { LoginSchema } from 'utils/validation';
import { ILogin } from 'pages';
import useThemeColors from 'hooks/useThemeColors';
import Loading from '../Loading';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { IAuth } from 'services/redux/reducer/auth/state';
import { setInputPassword, setInputUsername } from 'services/redux/reducer/inputs/actions';
import { togglelIsLoading } from 'services/redux/reducer/toggles/actions';
import { setLoginError } from 'services/redux/reducer/alert/actions';
import { setRememberMe } from 'services/redux/reducer/auth/actions';
import sdk from 'services/sdk';

interface ILoginForm extends ILogin {
  auth: IAuth;
  setInputUsername: typeof setInputUsername;
  setInputPassword: typeof setInputPassword;
  togglelIsLoading: typeof togglelIsLoading;
  setLoginError: typeof setLoginError;
  setRememberMe: typeof setRememberMe;
}

function LoginForm(props: ILoginForm) {
  const { callback, auth, setInputUsername, setInputPassword, togglelIsLoading, setLoginError } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const cookie = useCookie();

  const rememberMe = auth.remember_me ? 31556952 : 3600;
  const refreshRememberMe = auth.remember_me ? 63113904 : 7200;

  interface IValues {
    username: string;
    password: string;
  }

  const handleSubmit = async (values: IValues) => {
    try {
      const { username, password } = values;
      const res = await sdk.auth.login(username, password);
      if (res instanceof Error) return setLoginError('login error');
      if (res) {
        setIsLoading(true);

        const cookies = [
          { name: 'name', value: username, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
          { name: 'id', value: res.userId, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
          { name: 'token', value: res.AccessToken, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
          { name: 'refresh_token', value: res.RefreshToken, options: { sameSite: 'strict', maxAge: refreshRememberMe, path: '/' } },
        ];

        cookies.forEach((element) => {
          const { name, value, options } = element;
          cookie.set(name, value, { ...(options as any) });
        });

        const chatInstance: string = await generic.getFirstChat(cookie.get('id'), cookie.get('token'));

        cookie.set('REDIRECT_URL_CALLBACK', callback || `/${chatInstance}`);
        router.push(callback || `/${chatInstance}`);
        togglelIsLoading(false);
        setIsLoading(false);
        setInputUsername('');
        setInputPassword('');
      }
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  const color = useColorModeValue('white', '#343a40');
  const {
    colors: { chatBorderColor, formButton },
  } = useThemeColors();

  interface IRenderInputs {
    label: string;
    props: {
      type: string;
      name: 'username' | 'password';
      bg: string;
      border: string;
      borderColor: string;
      placeholder: string;
    };
  }

  const renderInputs: IRenderInputs[] = [
    {
      label: 'Username',
      props: {
        type: 'text',
        name: 'username',
        bg: color,
        border: '1px solid black',
        borderColor: chatBorderColor,
        placeholder: 'username ...',
      },
    },
    {
      label: 'Password',
      props: {
        border: '1px solid black',
        borderColor: chatBorderColor,
        type: 'password',
        name: 'password',
        bg: color,
        placeholder: 'password ...',
      },
    },
  ];

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
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
        <Button isLoading={isLoading} spinner={<Loading />} colorScheme={formButton} w="60%" type="submit">
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
  auth: state.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setInputUsername: bindActionCreators(setInputUsername, dispatch),
  setInputPassword: bindActionCreators(setInputPassword, dispatch),
  togglelIsLoading: bindActionCreators(togglelIsLoading, dispatch),
  setLoginError: bindActionCreators(setLoginError, dispatch),
  setRememberMe: bindActionCreators(setRememberMe, dispatch),
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
