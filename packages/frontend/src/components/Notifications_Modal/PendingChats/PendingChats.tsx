import React, { FC } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { css } from '@emotion/css';
import { useCookie } from 'next-cookie';
import { Button, Heading, HStack, Spacer, VStack } from '@chakra-ui/react';
import { Iinvites } from 'pages/[acc]';
import { SingleAvatar } from 'services/chat-ui';

// services
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { Status, useCreateChatMutation, useUpdateInviteMutation } from 'services/generated';
import useProvideAuth from 'hooks/useSession';

interface IPendingChats extends Iinvites {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  ws: IWebSocket;
}

const PendingChats: FC<IPendingChats> = ({ _id, inviter, reciever, status, ws }) => {
  const cookie = useCookie();
  const { auth } = useProvideAuth();
  const inviteId = _id;
  const [updateInvite] = useUpdateInviteMutation();
  const [createChat] = useCreateChatMutation();

  const emitFriendRequest = async () => {
    ws.ws?.emit('friend_request');
  };

  const updateInviteStatus = async (param: Status) => {
    try {
      await updateInvite({
        variables: { auth, invite_id: inviteId, status: param },
      });
      emitFriendRequest();
      return true;
    } catch (error) {
      return false;
    }
  };

  const createChatRoom = async () => {
    try {
      await createChat({
        variables: {
          auth,
          chat: { invite_id: _id, user1: inviter, user2: reciever, user_id: cookie.get('id') },
        },
      });
      emitFriendRequest();
    } catch (error) {
      return false;
    }
  };

  const isRecieved = status === 'recieved' && inviter !== cookie.get('name');

  const buttons = [
    {
      Svg: AiFillCheckCircle,
      Button,
      props: {
        bg: 'transparent',
        color: 'green.500',
        transition: '0.2s',
        _hover: { opacity: '0.8', transition: '0.2s' },
        onClick: async () => await createChatRoom(),
      },
    },
    {
      Svg: AiFillCloseCircle,
      Button,
      props: {
        bg: 'transparent',
        color: 'red.600',
        transition: '0.2s',
        _hover: { opacity: '0.8', transition: '0.2s' },
        onClick: async () => await updateInviteStatus(Status.Declined),
      },
    },
  ];

  return (
    <HStack w="full">
      {isRecieved && (
        <HStack w="98.5%" m={2} h="20vh">
          <VStack align="center">
            <SingleAvatar width="3rem" height="3rem" />
            <Heading>{inviter}</Heading>
          </VStack>
          <Spacer />
          <HStack>
            {buttons.map((element, index) => {
              const { props, Svg } = element;

              return (
                <Button key={index} {...props}>
                  <Svg
                    className={css`
                      width: 3rem;
                      height: 3rem;
                    `}
                  />
                </Button>
              );
            })}
          </HStack>
        </HStack>
      )}
    </HStack>
  );
};

const mapStateToProps = (state: STATE) => ({
  ws: state.ws,
});

export default connect(mapStateToProps)(PendingChats);
