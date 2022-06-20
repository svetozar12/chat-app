import { useSelector, useDispatch } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import ISave_inputState from "../../services/redux/reducer/save_inputReducer/state";
import Link from "next/dist/client/link";
import FormWrapper from "../FormWrapper";
import DefaultLink from "../DefaultLink";
import {
  Flex,
  FormLabel,
  HStack,
  VStack,
  Link as AnchorLink,
  Input,
  Button,
  Checkbox,
  SimpleGrid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import React from "react";
import api_helper from "../../services/graphql/api_helper";
import { getFirstChat } from "../../utils/getFirstChat";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";

function LoginForm() {
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  const inputState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const cookie = useCookie();

  const rememberMe = state.remember_me ? 31556952 : 3600;
  const refreshRememberMe = state.remember_me ? 63113904 : 7200;
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!inputState.input_username) {
        dispatch({ type: "LOGIN_POST_ERROR", bad: "Input cannot be empty" });
        setTimeout(() => {
          dispatch({ type: "LOGIN_POST_ERROR", bad: "" });
        }, 4000);
        return;
      }
      if (inputState.input_username) {
        const login = await api_helper.auth.login(inputState.input_username, inputState.input_password);

        if (login instanceof Error) return dispatch({ type: "LOGIN_POST_ERROR", bad: login.message });

        if (login) {
          dispatch({
            type: "SET_IS_LOADING",
            payload: true,
          });

          cookie.set("name", inputState.input_username, {
            sameSite: "strict",
            maxAge: rememberMe,
            path: "/",
          });

          cookie.set("id", login.user_id, {
            sameSite: "strict",
            maxAge: rememberMe,
            path: "/",
          });

          cookie.set("token", login.Access_token, {
            sameSite: "strict",
            maxAge: rememberMe,
            path: "/",
          });

          cookie.set("refresh_token", login.Refresh_token, {
            sameSite: "strict",
            maxAge: refreshRememberMe,
            path: "/",
          });

          const chatInstance: any = await getFirstChat(cookie.get("id"), cookie.get("token"));

          cookie.set("first_chat_id", chatInstance, {
            sameSite: "strict",
            maxAge: rememberMe,
            path: "/",
          });

          cookie.set("last_visited_chatRoom", chatInstance, {
            sameSite: "strict",
            path: "/",
          });
          const REDIRECT_URL_CALLBACK: string = cookie.get("REDIRECT_URL_CALLBACK");
          console.log(REDIRECT_URL_CALLBACK);

          cookie.set("REDIRECT_URL_CALLBACK", REDIRECT_URL_CALLBACK || `/${chatInstance}`);
          router.push(REDIRECT_URL_CALLBACK || `/${chatInstance}`);
          dispatch({
            type: "SET_IS_LOADING",
            payload: false,
          });
          dispatch({ type: "SAVE_INPUT", payload: "" });
        }
        return;
      }
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  const renderInputs = [
    {
      label: "Username",
      props: {
        value: inputState.input_username,
        onChange: (e) => dispatch({ type: "SAVE_INPUT_USERNAME", payload: e.target.value }),
        type: "text",
        name: "username",
        placeholder: "username ...",
      },
    },
    {
      label: "Password",
      props: {
        value: inputState.input_password,
        onChange: (e) => dispatch({ type: "SAVE_INPUT_PASSWORD", payload: e.target.value }),
        type: "password",
        name: "password",
        placeholder: "password ...",
      },
    },
  ];

  return (
    <FormWrapper type="Login">
      <>
        {renderInputs.map((element, index) => {
          const { props } = element;
          return (
            <React.Fragment key={index}>
              <FormLabel>{element.label}</FormLabel>
              <Input variant="FormInput" {...props} />
            </React.Fragment>
          );
        })}
      </>

      <Flex w="full" alignItems="center" justifyContent="center">
        <Button onClick={handleSubmit} colorScheme="blue" w="60%" type="submit">
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
}

export default LoginForm;
