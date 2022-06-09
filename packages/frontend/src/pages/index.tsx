import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
// import { useCookie } from "next-cookie";
// import { AppProps } from "next/dist/shared/lib/router/router";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import ISave_inputState from "../redux/reducer/save_inputReducer/state";
// import { IAuthState } from "../redux/reducer/authReducer/state";
import { wrapper } from "../redux/store";
// import { getFirstChat } from "../utils/getFirstChat";
// import LoginForm from "../components/LoginForm";
// import { checkJWT, loginAuth } from "../utils/authRoutes";
import api_helper from "../graphql/api_helper";
function Login() {
  const fetch = async () => {
    try {
      const res = await api_helper.auth.login("vanka3", "vanka3");
      console.log(res);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
    // if (loading) console.log("loading");
    // if (data) console.log(data);
    // if (error) console.log(error);
  }, []);

  // const [isLogging, setIsLogging] = React.useState(false);
  // const router = useRouter();
  // const cookie = useCookie(props.cookie);
  // const dispatch = useDispatch();
  // // const { loginPost } = bindActionCreators(actions, dispatch);
  // const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  // const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  // const rememberMe = authState.remember_me ? 31556952 : 3600;
  // const refreshRememberMe = authState.remember_me ? 63113904 : 7200;

  // const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (!state.input_username) {
  //     dispatch({ type: "LOGIN_POST_ERROR", bad: "Input cannot be empty" });
  //     setTimeout(() => {
  //       dispatch({ type: "LOGIN_POST_ERROR", bad: "" });
  //     }, 4000);
  //     return;
  //   }
  //   if (state.input_username) {
  //     const tokens: any = await loginAuth(state.input_username, state.input_password);

  //     const login = await loginPost(state.input_username, state.input_password);
  //     if (await login) {
  //       dispatch({ type: "QUICK_LOGIN", payload: true });
  //       setIsLogging(true);
  //       cookie.set("name", state.input_username, {
  //         sameSite: "strict",
  //         maxAge: rememberMe,
  //         path: "/",
  //       });
  //       const chatInstance: any = await getFirstChat(cookie.get("name"));
  //       cookie.set("first_chat_id", chatInstance._id, {
  //         sameSite: "strict",
  //         maxAge: rememberMe,
  //         path: "/",
  //       });

  //       cookie.set("token", tokens.JWT, {
  //         sameSite: "strict",
  //         maxAge: rememberMe,
  //         path: "/",
  //       });

  //       cookie.set("refresh_token", tokens.refreshJWT, {
  //         sameSite: "strict",
  //         maxAge: refreshRememberMe,
  //         path: "/",
  //       });

  //       cookie.set("last_visited_chatRoom", chatInstance._id, {
  //         sameSite: "strict",
  //         path: "/",
  //       });
  //       router.push(`/${chatInstance._id}`);
  //       dispatch({ type: "SIGN_IN", payload: cookie.get("name") });
  //       dispatch({ type: "SAVE_INPUT", payload: "" });
  //     }
  //     return;
  //   }
  // };
  return <p>hi</p>;
  // return <LoginForm handleSubmit={handleSubmit} isLogging={isLogging} />;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(() => async (context) => {
  // const cookie = useCookie(context);
  // await checkJWT(cookie.get("token"));
  // const chatInstance: any = await getFirstChat(cookie.get("name"));
  // if (cookie.has("name") && cookie.has("token")) {
  //   return {
  //     redirect: {
  //       destination: `/${chatInstance._id}`,
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      cookie: context.req.headers.cookie || "",
    },
  };
});

export default Login;
