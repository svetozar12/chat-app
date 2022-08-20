import React from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { css } from '@emotion/css';
import { useCookie } from 'next-cookie';
import { useSelector } from 'react-redux';
import { Button, Heading, HStack, Spacer, VStack } from '@chakra-ui/react';
import { Iinvites } from '../../../pages/[acc]';
import Single_avatar from '../../Avatar/Single_avatar';
// services
import api_helper from '../../../services/graphql/apiHelper';
import { IAuthState } from '../../../services/redux/reducer/authReducer/state';

interface IPendingChats extends Iinvites {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
}

function PendingChats({ _id, inviter, reciever, status }: IPendingChats) {
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const cookie = useCookie();
  const id: string = cookie.get('id');
  const inviteId = _id;
  const token: string = cookie.get('token');

  const emitFriendRequest = async () => {
    authState.ws?.emit('friend_request');
  };

  const updateInviteStatus = async (param: string) => {
    try {
      await api_helper.invite.update(id, inviteId, param, token);
      emitFriendRequest();

      return true;
    } catch (error) {
      return false;
    }
  };

  const createChatRoom = async () => {
    try {
      await api_helper.chatroom.create({ userId: id, invite_id: _id, user1: inviter, user2: reciever }, token);
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
            <Single_avatar width="3rem" height="3rem" />
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

export default PendingChats;
