import React from "react";
import { useSelector } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
// components
import Alerts from "../Alerts";
import { FormControl, Box, Heading, VStack } from "@chakra-ui/react";
interface IFormWrapper {
  children: JSX.Element | JSX.Element[];
}

const FormWrapper = ({ children }: IFormWrapper) => {
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  return (
    <>
      {(state.good || state.bad) && <Alerts />}
      <div style={{ width: "100%", height: "3rem" }}></div>
      <Heading w="60%" p="0.5rem" color="white" borderTopRadius="5px" textAlign="center" bg="chat_form_bg.100">
        Login
      </Heading>
      <Box w="60%" h="60vh" padding="3rem" boxShadow="default">
        <FormControl w="full" borderRadius="5px">
          {children}
        </FormControl>
      </Box>
    </>
  );
};

export default FormWrapper;
