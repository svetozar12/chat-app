import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import ISave_inputState from "../../services/redux/reducer/save_inputReducer/state";
import React from "react";
import api_helper from "../../services/graphql/api_helper";
import generic from "../../utils/generic";
import {
  Flex,
  FormLabel,
  HStack,
  Input,
  Button,
  Checkbox,
  SimpleGrid,
  GridItem,
  Box,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
// hooks
import { useSelector, useDispatch } from "react-redux";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
// components
import FormWrapper from "../FormWrapper";
import DefaultLink from "../DefaultLink";
import Loading from "../Loading";
import { useFormik } from "formik";
import { LoginSchema } from "../../utils/validation";
import { ILogin } from "../../pages";

interface ILoginForm extends ILogin {}

const LoginForm = ({ callback }: ILoginForm) => {
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const cookie = useCookie();

  const rememberMe = state.remember_me ? 31556952 : 3600;
  const refreshRememberMe = state.remember_me ? 63113904 : 7200;

  interface IValues {
    username: string;
    password: string;
  }

  const handleSubmit = async (values: IValues) => {
    try {
      const { username, password } = values;
      const login = await api_helper.auth.login(username, password);
      if (login instanceof Error) return dispatch({ type: "LOGIN_POST_ERROR", bad: login.message });

      if (login) {
        setIsLoading(true);

        const cookies = [
          { name: "name", value: username, options: { sameSite: "strict", maxAge: rememberMe, path: "/" } },
          { name: "id", value: login.user_id, options: { sameSite: "strict", maxAge: rememberMe, path: "/" } },
          { name: "token", value: login.Access_token, options: { sameSite: "strict", maxAge: rememberMe, path: "/" } },
          { name: "refresh_token", value: login.Refresh_token, options: { sameSite: "strict", maxAge: refreshRememberMe, path: "/" } },
        ];

        cookies.forEach((element) => {
          const { name, value, options } = element;
          // @ts-ignore
          cookie.set(name, value, { ...options });
        });

        const chatInstance: any = await generic.getFirstChat(cookie.get("id"), cookie.get("token"));

        cookie.set("REDIRECT_URL_CALLBACK", callback || `/${chatInstance}`);
        router.push(callback || `/${chatInstance}`);
        dispatch({
          type: "SET_IS_LOADING",
          payload: false,
        });
        setIsLoading(false);
        dispatch({ type: "SAVE_INPUT", payload: "" });
      }
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  const renderInputs = [
    {
      label: "Username",
      props: {
        type: "text",
        name: "username",
        placeholder: "username ...",
      },
    },
    {
      label: "Password",
      props: {
        type: "password",
        name: "password",
        placeholder: "password ...",
      },
    },
  ];

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <FormWrapper handleSubmit={formik.handleSubmit} type="Login">
      <>
        {renderInputs.map((element, index) => {
          const { props } = element;
          return (
            <FormControl isInvalid={formik.errors[props.name] && formik.touched[props.name]} key={index}>
              <FormLabel>{element.label}</FormLabel>
              <Input {...formik.getFieldProps(props.name)} variant="FormInput" {...props} />
              {formik.errors[props.name] && (
                <FormErrorMessage fontSize="xl" fontWeight="semibold">
                  {formik.errors[props.name]}
                </FormErrorMessage>
              )}
            </FormControl>
          );
        })}
      </>

      <Flex w="full" alignItems="center" justifyContent="center">
        <Button isLoading={isLoading} spinner={<Loading />} colorScheme="blue" w="60%" type="submit">
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
                checked={state.remember_me}
                onChange={(e) =>
                  dispatch({
                    type: "REMEMBER_ME_CHECK",
                    payload: e.target.checked,
                  })
                }
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
};

export default LoginForm;
