import React from 'react';
import { Heading, HStack } from '@chakra-ui/react';
import { useAuth } from 'utils/SessionProvider';

function FindFriendsHeader() {
  const { user } = useAuth();

  return (
    <HStack w="99%" pos="relative" minW="300px">
      <Heading size="md" whiteSpace="nowrap">
        {user.username} Chats
      </Heading>
    </HStack>
  );
}

export default React.memo(FindFriendsHeader);
