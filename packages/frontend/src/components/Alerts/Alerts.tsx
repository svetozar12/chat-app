import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import { Alert, AlertIcon, AlertTitle, CloseButton, HStack } from "@chakra-ui/react";
const Alerts = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const closeAlert = () => {
    dispatch({ type: "LOGIN_POST_ERROR", bad: "" });
    dispatch({ type: "REGISTER_POST", good: "" });
    dispatch({ type: "REGISTER_POST_ERROR", bad: "" });
  };

  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 5000);
  }, []);

  return (
    <HStack pos="absolute" w="60%" transform="translate(50%,-600%)" top="50%" right="50%">
      <Alert status={state.good ? "success" : "error"}>
        <AlertIcon />
        <AlertTitle textAlign="center" w="full">
          {state.good || state.bad}
        </AlertTitle>
        <CloseButton alignSelf="flex-start" position="relative" right={0} top={0} onClick={closeAlert} />
      </Alert>
    </HStack>
  );
};

export default Alerts;
