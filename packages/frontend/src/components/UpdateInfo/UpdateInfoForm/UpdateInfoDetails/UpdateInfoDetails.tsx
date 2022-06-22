import { Flex, FormLabel, VStack } from "@chakra-ui/react";
import { css } from "@emotion/css";
import React from "react";
import Single_avatar from "../../../Avatar/Single_avatar";
import { GrEdit } from "react-icons/gr";
interface IUpdateInfoDetails {
  image: string;
}

const UpdateInfoDetails = ({ image }: IUpdateInfoDetails) => {
  return (
    <>
      <FormLabel textAlign={{ base: "start", lg: "center" }} fontWeight="bold" fontSize="xl" mt={1}>
        Profile Avatar
      </FormLabel>
      <VStack align={{ base: "flex-start", lg: "center" }} pos="relative">
        <Single_avatar width="10rem" height="10rem" preview={image} />
        <FormLabel
          _hover={{ opacity: "0.8" }}
          className={css`
            width: 10rem;
            height: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            position: absolute;
            top: 0;
            transition: 0.2s;
            border-radius: 100%;
            border: none;
          `}
          htmlFor="file"
        >
          <Flex
            pos="absolute"
            left={0}
            bottom={0}
            gap={2}
            color="black"
            bg="white"
            justify="center"
            align="center"
            boxShadow="lg"
            px={2}
            py={1}
            borderRadius="5px"
            w="auto"
          >
            <GrEdit />
            Edit
          </Flex>
        </FormLabel>
      </VStack>
    </>
  );
};

export default UpdateInfoDetails;
