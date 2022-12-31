import { Box, HStack } from '@chakra-ui/react';
import { useCookie } from 'next-cookie';
import { SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import HamburgerMenu from '../../../services/chat-ui/HamburgerMenu';
import MainSection from '../../MainSection';
import MessagesSection from '../../MessagesSection';
import { connect } from 'react-redux';
import { setWSConnection } from 'services/redux/reducer/websocket/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { setNotifNumber } from 'services/redux/reducer/invites/actions';
import { toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import IInvite from 'services/redux/reducer/invites/state';
import { Invite, Status, useGetInvitesByInviterQuery, useGetInvitesByRecieverQuery } from 'services/generated';
import useProvideAuth from 'hooks/useSession';
import { useRouter } from 'next/router';

interface IApp extends ReturnType<typeof mapDispatchToProps> {
  cookie: string;
  invite: IInvite;
}

function App(props: IApp) {
  const { cookie: cookieProp, invite, setWSConnection, setNotifNumber, toggleQuickLogin } = props;
  const cookie = useCookie(cookieProp);
  const router = useRouter();
  const { acc } = router.query;
  const chatId = acc as string;
  // hooks
  const { auth } = useProvideAuth();
  const [contacts, setContacts] = useState<Invite[]>([]);
  const { refetch: refetchByInviter, data: dataInviter } = useGetInvitesByInviterQuery({ variables: { auth, status: Status.Accepted } });
  const { refetch: refetchByReciever, data: dataReciever } = useGetInvitesByRecieverQuery({ variables: { auth, status: Status.Accepted } });
  useNotifications(setContacts, invite, {
    setWSConnectionSetter: setWSConnection,
    setNotifNumberSetter: setNotifNumber,
    toggleQuickLoginSetter: toggleQuickLogin,
  });
  const FetchInvites = async (status: Status, InvitesOrigin: 'reciever' | 'inviter') => {
    try {
      setContacts([]);
      if (InvitesOrigin === 'reciever') {
        refetchByReciever({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') }, status });
        const { getInvitesByReciever } = dataReciever || {};
        if (getInvitesByReciever?.__typename === 'Error') throw Error(getInvitesByReciever.message);
        setContacts(getInvitesByReciever?.res as Invite[]);
        return getInvitesByReciever;
      } else {
        refetchByInviter({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') }, status });
        const { getInvitesByInviter } = dataInviter || {};
        if (getInvitesByInviter?.__typename === 'Error') throw Error(getInvitesByInviter.message);
        setContacts(getInvitesByInviter?.res as Invite[]);
        return getInvitesByInviter;
      }
    } catch (error) {
      setContacts([]);
      return false;
    }
  };

  return (
    <HStack w="full" h="100vh" ml="-0.5rem !important">
      <HStack h="100vh" pos="absolute">
        <Box w="95%" h="100vh" zIndex={100} pos="relative">
          <HamburgerMenu toggleHamburger={() => console.log('toggle hamburger menu')} />
        </Box>
      </HStack>
      <MainSection chatId={chatId} />
      <MessagesSection chatId={chatId} contacts={contacts} FetchInvites={FetchInvites} />
    </HStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  invite: state.invite,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setWSConnection: bindActionCreators(setWSConnection, dispatch),
  setNotifNumber: bindActionCreators(setNotifNumber, dispatch),
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const useNotifications = (
  setContacts: any,
  invite: IInvite,
  setters: {
    setWSConnectionSetter: typeof setWSConnection;
    setNotifNumberSetter: typeof setNotifNumber;
    toggleQuickLoginSetter: typeof toggleQuickLogin;
  },
) => {
  const { setNotifNumberSetter, setWSConnectionSetter, toggleQuickLoginSetter } = setters;
  const { auth } = useProvideAuth();
  const { refetch: refetchByReciever, data: dataReciever } = useGetInvitesByRecieverQuery({ variables: { auth, status: Status.Accepted } });
  const cookie = useCookie();

  const checkNotification = async () => {
    try {
      setContacts([]);
      refetchByReciever({
        auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') },
        status: Status.Recieved,
      });
      const { getInvitesByReciever } = dataReciever || {};
      if (getInvitesByReciever?.__typename === 'Error') throw Error(getInvitesByReciever.message);
      const { res } = getInvitesByReciever || {};
      setNotifNumberSetter(res!.length);
      setContacts(getInvitesByReciever?.res as Invite[]);
      getInvitesByReciever?.res?.forEach((item) => {
        if (item?.status === Status.Declined) return false;
      });
      return true;
    } catch (error) {
      setNotifNumberSetter(0);
      return false;
    }
  };

  useEffect(() => {
    toggleQuickLoginSetter(false);
    checkNotification();
  }, [invite.notificationNumber]);

  useEffect(() => {
    checkNotification();
    cookie.set('REDIRECT_URL_CALLBACK', window.location.pathname);
    const socketConnect: Socket = io('http://localhost:4000', {
      transports: ['websocket'],
    });

    socketConnect.on('friend_request', () => {
      checkNotification();
    });

    socketConnect.on('send_friend_request', () => {
      checkNotification();
    });
    setWSConnectionSetter(socketConnect);
    return () => {
      socketConnect.disconnect();
      setWSConnectionSetter(null);
    };
  }, []);
};
