/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
// services
import { FormLabel, Input, Button, Flex, useRadioGroup, HStack, FormControl, FormErrorMessage } from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import DefaultLink from '../../services/chat-ui/DefaultLink';
import RadioCard from '../../services/chat-ui/RadioCards/RadioCards';
import { RegisterSchema } from '../../utils/validation';
// components
import QuickLogin_Modal from './QuickLogin_Modal';
import FormWrapper from 'components/FormWrapper';
import useThemeColors from '../../hooks/useThemeColors';
import { toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { setInputEmail, setInputGender, setInputPassword, setInputUsername } from 'services/redux/reducer/inputs/actions';
import sdk from 'services/sdk';
import { Gender } from '@chat-app/gql-server';
import { setRegisterError } from 'services/redux/reducer/alert/actions';

interface IRegisterForm {
  quickLogin: () => Promise<boolean>;
  toggle: IToggle;
  toggleQuickLogin: typeof toggleQuickLogin;
  setInputEmail: typeof setInputEmail;
  setInputGender: typeof setInputGender;
  setInputPassword: typeof setInputPassword;
  setInputUsername: typeof setInputUsername;
  setRegisterError: typeof setRegisterError;
}

function RegisterForm(props: IRegisterForm) {
  const {
    base: {
      button: { color: btnColor },
      default: { color },
    },
  } = useThemeColors();
  const { quickLogin, toggle, toggleQuickLogin, setInputEmail, setInputGender, setInputPassword, setInputUsername, setRegisterError } =
    props;
  interface IValues {
    username: string;
    email: string;
    password: string;
    gender: Gender;
  }

  const handleSubmit = async ({ username, password, email, gender }: IValues) => {
    const register = await sdk.user.create({ user: { username, email, password, gender } });
    setInputUsername(username);
    setInputEmail(email);
    setInputPassword(password);
    setInputGender(gender);
    if (register instanceof Error) setRegisterError(register.message);
    if (register) toggleQuickLogin(false);
    else {
      setInputUsername('');
      setInputEmail('');
      setInputPassword('');
      setInputGender('');
    }
  };

  const handleGenderChange = (value: any) => {
    setInputGender(value);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'gender',
    defaultValue: 'Male',
    onChange: handleGenderChange,
  });

  const {
    colors: { input_bg, chat_border_color },
  } = useThemeColors();

  const group = getRootProps();
  const genderOptions = ['Male', 'Female'];
  interface IRenderInputs {
    label: string;
    props: {
      type: string;
      name: 'username' | 'password' | 'email';
      placeholder: string;
      boxShadow: string;
      _placeholder: any;
    };
  }
  const renderInputs: IRenderInputs[] = [
    {
      label: 'Username',
      props: {
        type: 'text',
        name: 'username',
        placeholder: 'username ...',
        boxShadow: `0px 0px 2px 0px ${color}`,
        _placeholder: { color, opacity: 0.5 },
      },
    },
    {
      label: 'Password',
      props: {
        type: 'password',
        name: 'password',
        placeholder: 'password ...',
        boxShadow: `0px 0px 2px 0px ${color}`,
        _placeholder: { color, opacity: 0.5 },
      },
    },
    {
      label: 'Email',
      props: {
        type: 'email',
        name: 'email',
        placeholder: 'email ...',
        boxShadow: `0px 0px 2px 0px ${color}`,
        _placeholder: { color, opacity: 0.5 },
      },
    },
  ];

  const formik = useFormik({
    initialValues: { username: '', password: '', email: '', gender: Gender.Male },
    validationSchema: RegisterSchema,
    onSubmit: (values: IValues) => {
      handleSubmit(values);
    },
  });

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
          <Button colorScheme={btnColor} w="60%" type="submit">
            Register
          </Button>
          <DefaultLink href="/" text="Already have an account?" />
        </Flex>
      </FormWrapper>
      {toggle.toggleQuickLogin && <QuickLogin_Modal quickLogin={quickLogin} />}
    </>
  );
}

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
  setInputUsername: bindActionCreators(setInputUsername, dispatch),
  setInputPassword: bindActionCreators(setInputPassword, dispatch),
  setInputEmail: bindActionCreators(setInputEmail, dispatch),
  setInputGender: bindActionCreators(setInputGender, dispatch),
  setRegisterError: bindActionCreators(setRegisterError, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
