import React from "react";
import { HStack, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

const SkelletonUserSettings = () => {
  const arr = ["", "", "", "", "", ""];
  return (
    <VStack gap={5} p="1rem" w="full">
      {arr.map((el, index) => {
        return (
          <HStack p="1rem" spacing={10} h="5rem" key={index} w="full">
            <SkeletonCircle size="3.5rem" />
            <VStack alignItems="flex-start" w="70%">
              <Skeleton w="80%">dawdawdawdawdaw</Skeleton>
              <Skeleton w="full">dawdawdawdawdaw</Skeleton>
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default SkelletonUserSettings;
