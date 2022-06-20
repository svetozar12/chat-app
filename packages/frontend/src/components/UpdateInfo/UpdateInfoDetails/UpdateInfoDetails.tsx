import { Box, Center, Flex, FormLabel, GridItem, Heading, VStack } from "@chakra-ui/react";
import { css } from "@emotion/css";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Single_avatar from "../../Avatar/Single_avatar";

interface IUpdateInfoDetails {
  image: string;
}

const UpdateInfoDetails = ({ image }: IUpdateInfoDetails) => {
  return (
    <GridItem w={{ base: 0, lg: "auto" }} h={{ base: 0, lg: "auto" }} visibility={{ base: "hidden", lg: "visible" }}>
      <Flex flexDir="column" h="full" alignItems="center" justifyContent="center">
        <Heading>Profile</Heading>
        <VStack pos="relative">
          <Single_avatar inviter="" width="6rem" height="6rem" preview={image} />
          <label
            className={css`
              width: 6rem;
              height: 6rem;
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
            <AiFillPlusCircle
              className={css`
                width: 2rem;
                height: 2rem;
                position: absolute;
                bottom: 0;
                right: 0;
                z-index: 10;
                transition: 0.2s;
                &: hover {
                  opacity: 0.9;
                  transition: 0.2s;
                }
              `}
            />
          </label>
        </VStack>
      </Flex>
    </GridItem>
  );
};

export default UpdateInfoDetails;
