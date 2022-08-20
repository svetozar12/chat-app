import { Box, HStack } from '@chakra-ui/react';
import { useCookie } from 'next-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import PropTypes from 'prop-types';
import HamburgerMenu from '../../../services/chat-ui/HamburgerMenu';
import MainSection from '../../MainSection';
import MessagesSection from '../../MessagesSection';
import { Ichats, Iinvites } from '../../../pages/[acc]';
import apiHelper from '../../../services/graphql/apiHelper';
import ISave_inputState from '../../../services/redux/reducer/save_inputReducer/state';

interface IApp {
  chatRoom: string;
  cookie: string;
}

function App(props: IApp) {
  const { chatRoom, cookie: cookieProp } = props;
  const cookie = useCookie(cookieProp);
  const userId: string = cookie.get('id');
  const token: string = cookie.get('token');
  const chatId = chatRoom.split('/')[0];
  // hooks
  const dispatch = useDispatch();
  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);
  const [contacts, setContacts] = useState<Iinvites[]>([]);
  const inputState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  const getChatRoom = async () => {
    try {
      setChatRooms([]);
      const res = await apiHelper.chatroom.getAll(userId, token);

      setChatRooms(res);
      return true;
    } catch (error) {
      return false;
    }
  };

  const FetchInvites = async (status: 'accepted' | 'recieved' | 'declined', InvitesOrigin: 'reciever' | 'inviter') => {
    try {
      setContacts([]);
      if (InvitesOrigin === 'reciever') {
        const res = await apiHelper.invite.getAllByReciever({ userId, token, status });
        if (res instanceof Error) throw Error(res.message);
        setContacts(res);
        return res;
      }
      const res = await apiHelper.invite.getAllByInviter({ userId, token, status: 'accepted' });
      if (res instanceof Error) throw Error(res.message);
      setContacts(res);
      return res;
    } catch (error) {
      setContacts([]);
      return false;
    }
  };

  const checkNotification = async () => {
    try {
      setContacts([]);
      const res = await apiHelper.invite.getAllByReciever({ userId, token, status: 'recieved' });
      if (res instanceof Error) throw Error(res.message);
      dispatch({ type: 'NOTIFICATION_NUMBER', payload: res.length });

      setContacts(res);
      if (res.status === 'declined') return false;
      return true;
    } catch (error) {
      dispatch({ type: 'NOTIFICATION_NUMBER', payload: 0 });
      return false;
    }
  };

  useEffect(() => {
    dispatch({ type: 'QUICK_LOGIN', payload: false });
    checkNotification();
  }, [inputState.notification_number]);

  useEffect(() => {
    getChatRoom();
    checkNotification();
    cookie.set('REDIRECT_URL_CALLBACK', window.location.pathname);
    const socketConnect: Socket = io('http://localhost:4000', {
      transports: ['websocket'],
    });

    socketConnect.on('friend_request', () => {
      getChatRoom();
      checkNotification();
    });

    socketConnect.on('send_friend_request', () => {
      console.log('recieved');

      checkNotification();
    });

    dispatch({ type: 'SET_WS_CONNECTED', payload: socketConnect });
    return () => {
      socketConnect.disconnect();
      dispatch({ type: 'SET_WS_CONNECTED', payload: null });
    };
  }, []);

  return (
    <HStack w="full" h="100vh">
      <HStack h="100vh" pos="absolute">
        <Box w="95%" h="100vh" zIndex={100} pos="relative">
          <HamburgerMenu toggleHamburger={() => console.log('toggle hamburger menu')} />
        </Box>
      </HStack>
      <MainSection chatId={chatId} chatRooms={chatRooms} />
      <MessagesSection chatId={chatId} contacts={contacts} FetchInvites={FetchInvites} />
    </HStack>
  );
}

App.prototype = {
  props: {
    cookie: PropTypes.string.isRequired,
    chatRoom: PropTypes.string.isRequired,
  },
};

export default App;
