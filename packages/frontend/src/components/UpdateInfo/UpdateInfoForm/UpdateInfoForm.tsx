import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  Input,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { css } from "@emotion/css";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ISave_inputState from "../../../services/redux/reducer/save_inputReducer/state";
import RadioCard from "../../RadioCards/RadioCards";

interface IUpdateInfoForm {
  url?: string;
  handleSubmit: any;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateInfoForm = ({ handleSubmit, url, setImage }: IUpdateInfoForm) => {
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  const genderOptions = ["Male", "Female"];
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
  return (
    <GridItem alignItems="center" justifyContent="center" boxShadow="default" p={10} borderRadius="2xl" colSpan={{ base: 3, lg: 2 }}>
      <FormControl gap={100} py={20} minH="30vh">
        <Heading fontSize={{ base: "4vw", lg: "2vw" }}>Update your profile info</Heading>
        <VStack gap={5} alignItems="flex-start" h="auto" justifyContent="center">
          <FormLabel>Email</FormLabel>
          <Input
            isInvalid
            variant="FormInput"
            type="email"
            value={state.input_email}
            w="full"
            onChange={(e) =>
              dispatch({
                type: "SAVE_INPUT_EMAIL",
                payload: e.target.value,
              })
            }
          />
          <FormLabel>User avatar:</FormLabel>
          <label
            className={css`
              margin: "2rem 1rem 0 0";
              margin-top: 1rem;
              border-radius: 5px;
              width: 60%;
              background-color: var(--button-blue);
              color: var(--main-white);
              border: 1px solid var(--input-border-color);
              padding: 1rem;
              cursor: pointer;
              transition: 0.2s;
              font-weight: bold;
              font-size: 1rem;
              text-align: center;
              &:hover {
                opacity: 0.7;
                transition: 0.2s;
              }
            `}
            htmlFor="file"
          >
            Add file
          </label>
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

          <Flex gap={5} w="full" justifyContent="flex-end">
            <Button minW="6rem" colorScheme="blue" onClick={handleSubmit} type="submit">
              Save
            </Button>
            <Link href={`/${url}`}>
              <Button minW="6rem" bg="rgba(0,0,0,.1)" className="link">
                Go back
              </Button>
            </Link>
          </Flex>
        </VStack>
      </FormControl>
    </GridItem>
  );
};

export default UpdateInfoForm;
