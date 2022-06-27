import React from "react";
import { Box, Button, Divider, Flex, GridItem, Heading, HStack, SimpleGrid, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

const SkelletonUserSettings = () => {
  return (
    <VStack w="100vw" h="100vh" display="flex" direction="column" justifyContent="center" alignItems="center">
      <Flex w="95%" align="flex-start">
        <Skeleton>
          <Heading>Personal Profile</Heading>
        </Skeleton>
      </Flex>
      <Divider w="95%" size="4rem" borderBottomWidth="1px" borderColor="#c9d1d9" />
      <VStack w="95%" h={{ base: "80vh", lg: "50vh" }}>
        <SimpleGrid my={5} gap={5} columns={2} h={{ base: "80vh", lg: "50vh" }} w="full">
          <GridItem w="full" h="full" colSpan={{ base: 2, lg: 1 }}>
            <Skeleton w="20%" h="1rem" mt={5}></Skeleton>
            <Skeleton w="full" h="3rem" mt={2}></Skeleton>
            <Skeleton w="20%" h="1rem" mt={5}></Skeleton>
            <Skeleton w="full" h="3rem" mt={2}></Skeleton>
            <Skeleton w="20%" h="1rem" mt={5}></Skeleton>
            <Skeleton w="30%" h="3rem" mt={2}></Skeleton>
            <Flex mt={5} gap={5}></Flex>
          </GridItem>

          <GridItem
            w="full"
            h="full"
            colSpan={{ base: 2, lg: 1 }}
            justifyContent={{ base: "flex-start", lg: "center" }}
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
        <HStack align="flex-start" w="full">
          <Skeleton>
            <Button w="6rem">test</Button>
          </Skeleton>
          <Skeleton>
            <Button w="6rem">test</Button>
          </Skeleton>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SkelletonUserSettings;
