import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  VStack,
} from "@chakra-ui/react";

const SkelletonUserSettings = () => {
  return (
    <VStack w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Flex w="95%" align="flex-start">
        <Skeleton>
          <Heading>Personal Profile</Heading>
        </Skeleton>
      </Flex>
      <Divider w="95%" size="4rem" borderBottomWidth="1px" borderColor="#c9d1d9" />
      <HStack w="95%">
        <SimpleGrid my={5} gap={5} columns={2} h="50ch" w="full">
          <GridItem w="full" h="full" colSpan={{ base: 2, lg: 1 }}>
            <Skeleton w="20%" h="1rem" mt={5}></Skeleton>
            <Skeleton w="full" h="3rem" mt={2}></Skeleton>
            <Skeleton w="20%" h="1rem" mt={5}></Skeleton>
            <Skeleton w="full" h="3rem" mt={2}></Skeleton>
            <Skeleton w="20%" h="1rem" mt={5}></Skeleton>
            <Skeleton w="30%" h="3rem" mt={2}></Skeleton>
            <Flex mt={5} gap={5}>
              <Skeleton>
                <Button w="6rem">test</Button>
              </Skeleton>
              <Skeleton>
                <Button w="6rem">test</Button>
              </Skeleton>
            </Flex>
          </GridItem>

          <GridItem
            w="full"
            h="full"
            colSpan={{ base: 2, lg: 1 }}
            justifyContent="center"
            justifyItems="center"
            alignItems="center"
            display="flex"
          >
            <Box gap={5}>
              <Skeleton mb={2}>
                <Heading size="md">Profile Avatar</Heading>
              </Skeleton>
              <SkeletonCircle size="10rem" />
            </Box>
          </GridItem>
        </SimpleGrid>
      </HStack>
    </VStack>
  );
};

export default SkelletonUserSettings;
