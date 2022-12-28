import { Box, HStack } from '@chakra-ui/react';
import { useCookie } from 'next-cookie';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import PropTypes from 'prop-types';
import HamburgerMenu from '../../../services/chat-ui/HamburgerMenu';
import MainSection from '../../MainSection';
import MessagesSection from '../../MessagesSection';
import sdk from 'services/sdk';
import { connect } from 'react-redux';
import { setWSConnection } from 'services/redux/reducer/websocket/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { setNotifNumber } from 'services/redux/reducer/invites/actions';
import { toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import IInvite from 'services/redux/reducer/invites/state';
import { Chat, Invite, Status } from 'services/generated';
import Sidebar from 'components/Sidebar/Sidebar';

interface IApp {
  chatRoom: string;
  cookie: string;
  invite: IInvite;
  setWSConnection: typeof setWSConnection;
  setNotifNumber: typeof setNotifNumber;
  toggleQuickLogin: typeof toggleQuickLogin;
}

function App(props: IApp) {
  const { chatRoom, cookie: cookieProp, invite, setWSConnection, setNotifNumber, toggleQuickLogin } = props;
  const cookie = useCookie(cookieProp);
  const chatId = chatRoom.split('/')[0];
  // hooks
  const [chatRooms, setChatRooms] = useState<Chat[]>([]);
  const [contacts, setContacts] = useState<Invite[]>([]);

  const getChatRoom = async () => {
    try {
      setChatRooms([]);
      const res = await sdk.chatroom.getAll({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') } });
      setChatRooms(res);
      return true;
    } catch (error) {
      return false;
    }
  };

  const FetchInvites = async (status: Status, InvitesOrigin: 'reciever' | 'inviter') => {
    try {
      setContacts([]);
      if (InvitesOrigin === 'reciever') {
        const res = await sdk.invite.getAllByReciever({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') }, status });
        if (res instanceof Error) throw Error(res.message);
        setContacts(res);
        return res;
      }
      const res = await sdk.invite.getAllByInviter({
        auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') },
        status: Status.Recieved,
      });
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
      const res = await sdk.invite.getAllByReciever({
        auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') },
        status: Status.Recieved,
      });
      if (res instanceof Error) throw Error(res.message);
      setNotifNumber(res.length);
      setContacts(res);
      res.forEach((item) => {
        if (item.status === Status.Declined) return false;
      });
      return true;
    } catch (error) {
      setNotifNumber(0);
      return false;
    }
  };

  useEffect(() => {
    toggleQuickLogin(false);
    checkNotification();
  }, [invite.notificationNumber]);

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
    setWSConnection(socketConnect);
    return () => {
      socketConnect.disconnect();
      setWSConnection(null);
    };
  }, []);

  return (
    <HStack w="full" h="100vh" ml="-0.5rem !important">
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

const mapStateToProps = (state: STATE) => ({
  invite: state.invite,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setWSConnection: bindActionCreators(setWSConnection, dispatch),
  setNotifNumber: bindActionCreators(setNotifNumber, dispatch),
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
