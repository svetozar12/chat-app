import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/css";
import QuickLogin_Modal from "./QuickLogin_Modal";
// services
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import ISave_inputState from "../../services/redux/reducer/save_inputReducer/state";
import FormWrapper from "../FormWrapper";
import { FormLabel, Input, Button, Flex, Spacer, useRadioGroup, HStack } from "@chakra-ui/react";
import React from "react";
import DefaultLink from "../DefaultLink";
import RadioCard from "../RadioCards/RadioCards";
import api_helper from "../../services/graphql/api_helper";

interface IRegisterForm {
  // eslint-disable-next-line no-unused-vars
  quickLogin: () => Promise<boolean>;
}

function RegisterForm({ quickLogin }: IRegisterForm) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const inputState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const register = await api_helper.user.create(
      inputState.input_username,
      inputState.input_email,
      inputState.input_password,
      inputState.input_gender,
    );
    setIsLoading(true);

    if (await register) {
      dispatch({ type: "QUICK_LOGIN", payload: true });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      dispatch({ type: "SAVE_INPUT_USERNAME", payload: "" });
      dispatch({ type: "SAVE_INPUT_PASSWORD", payload: "" });
      dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
      dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
    }
  };

  const handleGenderChange = (value) => {
    dispatch({
      type: "SAVE_INPUT_GENDER",
      payload: value,
    });
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "gender",
    defaultValue: "Male",
    onChange: handleGenderChange,
  });

  const group = getRootProps();
  const genderOptions = ["Male", "Female"];
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
    {
      label: "Email",
      props: {
        value: inputState.input_email,
        onChange: (e) => dispatch({ type: "SAVE_INPUT_EMAIL", payload: e.target.value }),
        type: "email",
        name: "email",
        placeholder: "email ...",
      },
    },
  ];

  return (
    <>
      <FormWrapper type="Register">
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

        <FormLabel>Gender</FormLabel>
        <Flex w="full" justifyContent="center">
          <HStack gap={10} {...group}>
            {genderOptions.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
        </Flex>
        <Flex w="full" alignItems="center" justifyContent="center" gap={5} flexDir="column">
          <Button onClick={handleSubmit} colorScheme="blue" w="60%" type="submit">
            Register
          </Button>
          <DefaultLink href="/" text="Already have an account?" />
        </Flex>
      </FormWrapper>
      {state.loginPrompt && <QuickLogin_Modal quickLogin={quickLogin} />}
    </>
  );
}

export default RegisterForm;
