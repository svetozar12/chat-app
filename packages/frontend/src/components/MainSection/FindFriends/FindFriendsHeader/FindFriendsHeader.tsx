import React from 'react';
import { Heading, HStack } from '@chakra-ui/react';
import useProvideAuth from 'hooks/useSession';

const FindFriendsHeader = () => {
  const { user, query } = useProvideAuth();
  const { loading } = query || {};
  if (loading) return <>...loading</>;
  return (
    <HStack w="99%" pos="relative" minW="300px">
      <Heading size="md" whiteSpace="nowrap">
        {user?.username} Chats
      </Heading>
    </HStack>
  );
};

export default React.memo(FindFriendsHeader);
