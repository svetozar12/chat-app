import React from 'react';
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
import sdk from 'services/sdk';

interface IPendingChats extends Iinvites {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  ws: IWebSocket;
}

function PendingChats(props: IPendingChats) {
  const { _id, inviter, reciever, status, ws } = props;
  const cookie = useCookie();
  const inviteId = _id;

  const emitFriendRequest = async () => {
    ws.ws?.emit('friend_request');
  };

  const updateInviteStatus = async (param: string) => {
    try {
      await sdk.invite.update({ userId: cookie.get('id'), AccessToken: cookie.get('token') }, inviteId, param);
      emitFriendRequest();
      return true;
    } catch (error) {
      return false;
    }
  };

  const createChatRoom = async () => {
    try {
      await sdk.chatroom.create(
        { invite_id: _id, user1: inviter, user2: reciever, user_id: cookie.get('id') },
        { userId: cookie.get('id'), AccessToken: cookie.get('token') },
      );
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
        onClick: async () => await updateInviteStatus('declined'),
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
}

const mapStateToProps = (state: STATE) => ({
  ws: state.ws,
});

export default connect(mapStateToProps)(PendingChats);
