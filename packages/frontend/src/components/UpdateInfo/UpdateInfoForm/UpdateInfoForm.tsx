import { FormLabel, GridItem, HStack, Input, Radio, RadioGroup, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ISave_inputState from "../../../services/redux/reducer/save_inputReducer/state";
import UpdateInfoDetails from "./UpdateInfoDetails";

interface IUpdateInfoForm {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateInfoForm = ({ setImage, image }: IUpdateInfoForm) => {
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  const InputsLayout = [
    {
      label: "Username",
      props: {
        variant: "FormInput",
        type: "email",
        value: state.input_username,
        w: "full",
        onChange: (e) =>
          dispatch({
            type: "SAVE_INPUT_USERNAME",
            payload: e.target.value,
          }),
      },
    },
    {
      label: "Email",
      props: {
        variant: "FormInput",
        type: "email",
        value: state.input_email,
        w: "full",
        onChange: (e) =>
          dispatch({
            type: "SAVE_INPUT_EMAIL",
            payload: e.target.value,
          }),
      },
    },
  ];

  return (
    <SimpleGrid my={5} gap={5} columns={2} w="full">
      <GridItem w="full" colSpan={{ base: 2, lg: 1 }}>
        {InputsLayout.map((element, index) => {
          const { label, props } = element;
          return (
            <VStack mt={1} key={index} align="flex-start" w="full">
              <FormLabel fontWeight="bold" fontSize="xl">
                {label}
              </FormLabel>
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
};

export default UpdateInfoForm;
