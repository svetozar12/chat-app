import { Box, Button, Divider, Flex, FormControl, Heading, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import { useCookie } from "next-cookie";
import React from "react";

interface IUpdateInfo {
  children: JSX.Element | JSX.Element[];
  handleSubmit: any;
}

const UpdateInfo = ({ children, handleSubmit }: IUpdateInfo) => {
  const cookie = useCookie();
  return (
    <Box w="95%">
      {" "}
      <VStack w="full" px={10} align="flex-start">
        <Heading>Personal Profile</Heading>
        <Divider size="4rem" borderBottomWidth="1px" borderColor="#c9d1d9" />
        <FormControl minH="30vh">
          <VStack alignItems="flex-start" h="auto" justifyContent="center">
            {children}
            <Flex gap={5} w="full" justifyContent="flex-start">
              <Button minW="6rem" colorScheme="blue" onClick={handleSubmit} type="submit">
                Save
              </Button>
              <Link href={`/${cookie.get("last_visited_chatRoom")}`}>
                <Button minW="6rem" bg="rgba(0,0,0,.1)" className="link">
                  Go back
                </Button>
              </Link>
            </Flex>
          </VStack>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default UpdateInfo;
