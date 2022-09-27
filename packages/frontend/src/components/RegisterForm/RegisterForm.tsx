import { useDispatch, useSelector } from "react-redux";
// services
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import { FormLabel, Input, Button, Flex, useRadioGroup, HStack, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";
import DefaultLink from "../DefaultLink";
import RadioCard from "../RadioCards/RadioCards";
import api_helper from "../../services/graphql/api_helper";
import { useFormik } from "formik";
import { RegisterSchema } from "../../utils/validation";
// components
import QuickLogin_Modal from "./QuickLogin_Modal";
import FormWrapper from "../FormWrapper";

interface IRegisterForm {
  // eslint-disable-next-line no-unused-vars
  quickLogin: () => Promise<boolean>;
}

function RegisterForm({ quickLogin }: IRegisterForm) {
  const dispatch = useDispatch();
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  interface IValues {
    username: string;
    email: string;
    password: string;
    gender: "male" | "female";
  }

  const handleSubmit = async ({ username, password, email, gender }: IValues) => {
    const register = await api_helper.user.create(username, email, password, gender);

    if (await register) dispatch({ type: "QUICK_LOGIN", payload: true });
    else {
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
    {
      label: "Email",
      props: {
        type: "email",
        name: "email",
        placeholder: "email ...",
      },
    },
  ];

  const formik = useFormik({
    initialValues: { username: "", password: "", email: "", gender: "male" },
    validationSchema: RegisterSchema,
    onSubmit: (values: IValues) => {
      handleSubmit(values);
    },
    // validateOnChange: false,
    // validateOnBlur: false,
  });

  return (
    <>
      <FormWrapper handleSubmit={formik.handleSubmit} type="Register">
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

        <FormLabel>Gender</FormLabel>
        <Flex w="full" justifyContent="center">
          <HStack gap={10} {...group}>
            {genderOptions.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard {...formik.getFieldProps(value)} key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
        </Flex>
        <Flex w="full" alignItems="center" justifyContent="center" gap={5} flexDir="column">
          <Button colorScheme="blue" w="60%" type="submit">
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
