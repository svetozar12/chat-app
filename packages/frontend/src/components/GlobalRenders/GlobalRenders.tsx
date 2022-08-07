import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAuthState } from "services/redux/reducer/authReducer/state";
import { IInitialSet } from "services/redux/reducer/setReducer/state";
import { Global } from "@emotion/react";
import Head from "next/dist/shared/lib/head";
import { css } from "@emotion/css";
import { useColorMode } from "@chakra-ui/react";

const App = () => {
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  const setState = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const dispatch = useDispatch();

  const closeModals = () => {
    dispatch({
      type: "SET_FRIEND_REQUEST",
      payload: false,
    });
    dispatch({
      type: "SET_MODAL_INVITE",
      payload: false,
    });
    dispatch({
      type: "QUICK_LOGIN",
      payload: false,
    });
  };

  const { colorMode } = useColorMode();

  const Blur: boolean = setState.setFriendRequest || setState.setModalInvite || state.loginPrompt;

  return (
    <>
      <Global
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        styles={{
          body: {
            margin: 0,
            padding: 0,
            userSelect: Blur ? "none" : "select",
          },
          a: {
            textDecoration: "none",
          },
        }}
      />
      <Head>
        <title>{colorMode}</title>
      </Head>
      <div
        className={css`
          position: absolute;
          z-index: ${Blur ? "101" : "-1"};
          width: 100vw;
          height: 100vh;
          opacity: 0.7;
          background: ${colorMode === "dark" ? "#1A202C" : "#FCFCFC"};
        `}
        onClick={closeModals}
      ></div>
    </>
  );
};

export default App;
