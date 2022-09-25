import React from 'react';
import { useCookie } from 'next-cookie';
import { HStack } from '@chakra-ui/react';
import { SingleAvatar } from 'services/chat-ui';
import GroupAvatar from 'components/Avatar/GroupAvatar';

interface IAvatar {
  members: string[];
}

function Avatar({ members }: IAvatar) {
  const cookie = useCookie();
  return (
    <HStack w="4rem" h="4rem" data-testid="avatar" title={cookie.get('username')}>
      {members && members.length <= 2 ? (
        <div>
          <SingleAvatar />
        </div>
      ) : (
        <div>{members && <GroupAvatar members={members} />}</div>
      )}
    </HStack>
  );
}

export default Avatar;
