import { useSelector, useDispatch } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import ISave_inputState from "../../services/redux/reducer/save_inputReducer/state";
import Link from "next/dist/client/link";
import styled from "@emotion/styled";
import FormWrapper from "../FormWrapper";
import { Flex, FormLabel, HStack, VStack, Link as AnchorLink, Input, Button, Spacer, Checkbox } from "@chakra-ui/react";
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
        value: inputState.input_username,
        onChange: (e) => dispatch({ type: "SAVE_INPUT_PASSWORD", payload: e.target.value }),
        type: "password",
        name: "password",
        placeholder: "password ...",
      },
    },
  ];

  return (
    <Flex h="100vh" flexDir="column" alignItems="center" justifyContent="center">
      <FormWrapper>
        <VStack alignItems="flex-start" spacing={5}>
          {renderInputs.map((element, index) => {
            const { props } = element;
            return (
              <React.Fragment key={index}>
                <FormLabel>{element.label}</FormLabel>
                <Input colorScheme="black" {...props} />
              </React.Fragment>
            );
          })}

          <Button colorScheme="blue" w="full" type="submit">
            Log In
          </Button>
          <HStack spacing="5" alignItems="center" justifyContent="center" w="full">
            <HStack w="60%">
              <Link href="/register">
                <AnchorLink color="blue.500" fontWeight="bold" href="#">
                  Sign up for chatApp .
                </AnchorLink>
              </Link>
              <Spacer />
              <Checkbox
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
          </HStack>
        </VStack>
      </FormWrapper>
    </Flex>
  );
}

export default LoginForm;
