/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
// services
import { FormLabel, Input, Button, Flex, useRadioGroup, HStack, FormControl, FormErrorMessage } from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import { IAuthState } from '../../services/redux/reducer/authReducer/state';
import DefaultLink from '../../services/chat-ui/DefaultLink';
import RadioCard from '../../services/chat-ui/RadioCards/RadioCards';
import api_helper from '../../services/graphql/apiHelper';
import { RegisterSchema } from '../../utils/validation';
// components
import QuickLogin_Modal from './QuickLogin_Modal';
import FormWrapper from '../../services/chat-ui/FormWrapper';
import useThemeColors from '../../hooks/useThemeColors';

interface IRegisterForm {
  quickLogin: () => Promise<boolean>;
}

function RegisterForm({ quickLogin }: IRegisterForm) {
  const dispatch = useDispatch();
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  interface IValues {
    username: string;
    email: string;
    password: string;
    gender: 'Male' | 'Female' | 'Other';
  }

  const handleSubmit = async ({ username, password, email, gender }: IValues) => {
    const register = await api_helper.user.create(username, email, password, gender);
    dispatch({ type: 'SAVE_INPUT_USERNAME', payload: username });
    dispatch({ type: 'SAVE_INPUT_PASSWORD', payload: password });
    dispatch({ type: 'SAVE_INPUT_EMAIL', payload: email });
    dispatch({ type: 'SAVE_INPUT_GENDER', payload: gender });
    if (await register) dispatch({ type: 'QUICK_LOGIN', payload: true });
    else {
      dispatch({ type: 'SAVE_INPUT_USERNAME', payload: '' });
      dispatch({ type: 'SAVE_INPUT_PASSWORD', payload: '' });
      dispatch({ type: 'SAVE_INPUT_EMAIL', payload: '' });
      dispatch({ type: 'SAVE_INPUT_GENDER', payload: '' });
    }
  };

  const handleGenderChange = (value: any) => {
    dispatch({
      type: 'SAVE_INPUT_GENDER',
      payload: value,
    });
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'gender',
    defaultValue: 'Male',
    onChange: handleGenderChange,
  });

  const group = getRootProps();
  const genderOptions = ['Male', 'Female'];
  interface IRenderInputs {
    label: string;
    props: {
      type: string;
      name: 'username' | 'password' | 'email';
      placeholder: string;
    };
  }
  const renderInputs: IRenderInputs[] = [
    {
      label: 'Username',
      props: {
        type: 'text',
        name: 'username',
        placeholder: 'username ...',
      },
    },
    {
      label: 'Password',
      props: {
        type: 'password',
        name: 'password',
        placeholder: 'password ...',
      },
    },
    {
      label: 'Email',
      props: {
        type: 'email',
        name: 'email',
        placeholder: 'email ...',
      },
    },
  ];

  const formik = useFormik({
    initialValues: { username: '', password: '', email: '', gender: 'Male' },
    validationSchema: RegisterSchema,
    onSubmit: (values: IValues) => {
      handleSubmit(values);
    },
  });

  const {
    colors: { formButton },
  } = useThemeColors();

  return (
    <>
      <FormWrapper handleSubmit={formik.handleSubmit} type="Register">
        <>
          {renderInputs.map((element, index) => {
            const { props } = element;
            const { name } = props;
            const isInvalid = Boolean(formik.errors[name] && formik.touched[name]);

            return (
              <FormControl isInvalid={isInvalid} key={index}>
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
                  {value as any}
                </RadioCard>
              );
            })}
          </HStack>
        </Flex>
        <Flex w="full" alignItems="center" justifyContent="center" gap={5} flexDir="column">
          <Button colorScheme={formButton} w="60%" type="submit">
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
