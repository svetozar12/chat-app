import React from "react";
import { useSelector } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
// components
import Alerts from "../Alerts";
import { FormControl, Box, Heading, VStack, Flex } from "@chakra-ui/react";

interface IFormWrapper {
  children: JSX.Element | JSX.Element[];
  type: "Register" | "Login";
  handleSubmit: () => void;
}

const FormWrapper = ({ children, type, handleSubmit }: IFormWrapper) => {
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  return (
    <>
      {(state.good || state.bad) && <Alerts />}
      <Flex h="100vh" flexDir="column" alignItems="center" justifyContent="center">
        <Heading
          w={{ base: "95%", sm: "90%", md: "70%", lg: "60%", xl: "40%" }}
          p="0.5rem"
          color="white"
          borderTopRadius="5px"
          textAlign="center"
          bg="form_gray"
        >
          {type}
        </Heading>
        <Box w={{ base: "95%", sm: "90%", md: "70%", lg: "60%", xl: "40%" }} maxH="auto" minH="45vh" padding="3rem" boxShadow="default">
          <FormControl w="full" borderRadius="5px">
            <form onSubmit={handleSubmit}>
              <VStack w="full" alignItems="flex-start" spacing={5}>
                {children}
              </VStack>
            </form>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
};

export default FormWrapper;
