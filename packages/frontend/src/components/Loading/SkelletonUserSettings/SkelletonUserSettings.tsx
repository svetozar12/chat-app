import React from "react";
import { Flex, GridItem, HStack, SimpleGrid, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

const SkelletonUserSettings = () => {
  return (
    <HStack w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <HStack w="80%">
        <SimpleGrid placeItems="center" w="full" columns={3}>
          <GridItem w={{ base: 0, lg: "full" }} h={{ base: 0, lg: "full" }} colSpan={{ base: 0, lg: 1 }}>
            <Flex h="full" flexDir="column" justifyContent="center" alignItems="center" visibility={{ base: "hidden", lg: "visible" }}>
              <Skeleton w="10rem" h="2rem">
                <h1>Profile</h1>
              </Skeleton>
              <SkeletonCircle size="20" />
            </Flex>
          </GridItem>
          <GridItem w="full" h="full" colSpan={{ base: 3, lg: 2 }}>
            <VStack height="full">
              <Skeleton py={20} w="full" h="95vh"></Skeleton>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </HStack>
    </HStack>
  );
};

export default SkelletonUserSettings;
