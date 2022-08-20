import React from 'react';
import { HStack, SkeletonCircle, Spacer } from '@chakra-ui/react';

function SkeletonFindFriendsHeader() {
  const arr = ['', '', ''];
  return (
    <HStack gap={5} mt="3rem" p="1rem" w="full">
      <SkeletonCircle size="3.5rem" />
      <Spacer />
      {arr.map((el, index) => (
        <SkeletonCircle key={index} size="3.5rem" />
      ))}
    </HStack>
  );
}

export default SkeletonFindFriendsHeader;
