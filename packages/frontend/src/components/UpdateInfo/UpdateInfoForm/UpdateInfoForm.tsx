import { FormLabel, GridItem, HStack, Input, Radio, RadioGroup, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ISave_inputState from '../../../services/redux/reducer/save_inputReducer/state';
import UpdateInfoDetails from './UpdateInfoDetails';

interface IUpdateInfoForm {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

function UpdateInfoForm({ image }: IUpdateInfoForm) {
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  const color = useColorModeValue('black', 'white');

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
        value: state.input_username,
        id: 'username',
        w: 'full',
        onChange: (e: any) =>
          dispatch({
            type: 'SAVE_INPUT_USERNAME',
            payload: e.target.value,
          }),
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
        value: state.input_email,
        w: 'full',
        id: 'email',
        color,
        onChange: (e: any) =>
          dispatch({
            type: 'SAVE_INPUT_EMAIL',
            payload: e.target.value,
          }),
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
        value: state.input_file,
        display: 'none',
        onChange: (e: any) =>
          dispatch({
            type: 'SAVE_INPUT_FILE',
            payload: e.target.value,
          }),
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

export default UpdateInfoForm;
