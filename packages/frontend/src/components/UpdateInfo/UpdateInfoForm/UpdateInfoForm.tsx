import { FormLabel, GridItem, HStack, Input, Radio, RadioGroup, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react';
import useThemeColors from 'hooks/useThemeColors';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { setInputEmail, setInputFile, setInputGender, setInputPassword, setInputUsername } from 'services/redux/reducer/inputs/actions';
import IInputs from 'services/redux/reducer/inputs/state';
import { toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import UpdateInfoDetails from './UpdateInfoDetails';

interface IUpdateInfoForm {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  inputs: IInputs;
  toggleQuickLogin: typeof toggleQuickLogin;
  setInputEmail: typeof setInputEmail;
  setInputGender: typeof setInputGender;
  setInputPassword: typeof setInputPassword;
  setInputUsername: typeof setInputUsername;
}

function UpdateInfoForm(props: IUpdateInfoForm) {
  const { image, inputs, toggleQuickLogin, setInputEmail, setInputGender, setInputPassword, setInputUsername } = props;
  const {
    base: {
      default: { color },
    },
  } = useThemeColors();

  const InputsLayout = [
    {
      label: 'Username',
      labelProps: {
        htmlFor: 'username',
        fontWeight: 'bold',
        fontSize: 'xl',
      },
      props: {
        variant: 'FormInput',
        type: 'username',
        value: inputs.input_username,
        id: 'username',
        w: 'full',
        onChange: (e: any) => setInputUsername(e.target.value),
        color,
      },
    },
    {
      label: 'Email',
      labelProps: {
        htmlFor: 'email',
        fontWeight: 'bold',
        fontSize: 'xl',
      },
      props: {
        variant: 'FormInput',
        type: 'email',
        value: inputs.input_email,
        w: 'full',
        id: 'email',
        color,
        onChange: (e: any) => setInputEmail(e.target.value),
      },
    },
    {
      label: '',
      labelProps: {
        htmlFor: 'file',
        fontWeight: 'bold',
        fontSize: 'xl',
      },
      props: {
        variant: 'FormInput',
        type: 'file',
        id: 'file',
        color,
        value: inputs.input_file,
        display: 'none',
        onChange: (e: any) => setInputFile(e.target.value),
      },
    },
  ];

  return (
    <SimpleGrid my={5} gap={5} columns={2} w="full">
      <GridItem w="full" colSpan={{ base: 2, lg: 1 }}>
        {InputsLayout.map((element, index) => {
          const { label, labelProps, props } = element;
          return (
            <VStack mt={1} key={index} align="flex-start" w="full">
              <FormLabel {...labelProps}>{label}</FormLabel>
              <Input {...props} />
            </VStack>
          );
        })}

        <FormLabel fontWeight="bold" fontSize="xl" mt={1}>
          Gender
        </FormLabel>
        <RadioGroup defaultValue="2">
          <HStack spacing={5} direction="row">
            <Radio colorScheme="blue" value="1">
              Male
            </Radio>
            <Radio colorScheme="pink" value="2">
              Female
            </Radio>
          </HStack>
        </RadioGroup>
      </GridItem>

      <GridItem w="full" colSpan={{ base: 2, lg: 1 }}>
        <UpdateInfoDetails image={image} />
      </GridItem>
    </SimpleGrid>
  );
}

const mapStateToProps = (state: STATE) => ({
  inputs: state.inputs,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
  setInputUsername: bindActionCreators(setInputUsername, dispatch),
  setInputPassword: bindActionCreators(setInputPassword, dispatch),
  setInputEmail: bindActionCreators(setInputEmail, dispatch),
  setInputGender: bindActionCreators(setInputGender, dispatch),
  setInputFile: bindActionCreators(setInputFile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoForm);
