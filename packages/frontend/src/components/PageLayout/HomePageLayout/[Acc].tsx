import { Box, HStack } from '@chakra-ui/react';
import { useCookie } from 'next-cookie';
import { FC, useEffect, useState } from 'react';
import HamburgerMenu from '../../../services/chat-ui/HamburgerMenu';
import MainSection from '../../MainSection';
import MessagesSection from '../../MessagesSection';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { setNotifNumber } from 'services/redux/reducer/invites/actions';
import { toggleMobileNav, toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import IInvite from 'services/redux/reducer/invites/state';
import { Invite, Status, useGetInvitesByInviterQuery, useGetInvitesByRecieverQuery } from 'services/generated';
import useProvideAuth from 'hooks/useSession';
import { useRouter } from 'next/router';
import { IWebSocket } from 'services/redux/reducer/websocket/state';

interface IApp extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  chatRoom: string;
  invite: IInvite;
}

const App: FC<IApp> = ({ invite, ws, setNotifNumber, toggle, toggleMobileNav, toggleQuickLogin }) => {
  const router = useRouter();
  const cookie = useCookie();
  const { auth } = useProvideAuth();
  const [contacts, setContacts] = useState<Invite[]>([]);
  const { loading: loadingInv } = useGetInvitesByInviterQuery({ variables: { auth, status: Status.Recieved } });
  const { loading: loadingRec } = useGetInvitesByRecieverQuery({ variables: { auth, status: Status.Recieved } });
  useNotifications(setContacts, invite, ws, {
    setNotifNumberSetter: setNotifNumber,
    toggleQuickLoginSetter: toggleQuickLogin,
  });

  const { acc } = router.query;
  const chatId = acc as string;
  useEffect(() => {
    ws.ws?.emit('join_chat', {
      rooms: [cookie.get('name'), chatId],
    });
    return () => {
      ws.ws?.off('join_chat');
    };
  }, [ws.ws, chatId]);

  return (
    <HStack w="full" h="100vh" ml="-0.5rem !important">
      <HStack h="100vh" pos="absolute">
        <Box w="95%" h="100vh" zIndex={100} pos="relative">
          <HamburgerMenu toggleHamburger={() => toggleMobileNav(!toggle.toggleMobileNav)} />
        </Box>
      </HStack>
      <MainSection chatId={chatId} />
      <MessagesSection chatId={chatId} contacts={contacts} isLoading={loadingInv || loadingRec} />
    </HStack>
  );
};

const mapStateToProps = (state: STATE) => ({
  invite: state.invite,
  toggle: state.toggle,
  ws: state.ws,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNotifNumber: bindActionCreators(setNotifNumber, dispatch),
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
  toggleMobileNav: bindActionCreators(toggleMobileNav, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const useNotifications = (
  setContacts: any,
  invite: IInvite,
  ws: IWebSocket,
  setters: {
    setNotifNumberSetter: typeof setNotifNumber;
    toggleQuickLoginSetter: typeof toggleQuickLogin;
  },
) => {
  const { setNotifNumberSetter, toggleQuickLoginSetter } = setters;
  const { auth } = useProvideAuth();
  const {
    refetch: refetchByReciever,
    loading,
    data: dataReciever,
  } = useGetInvitesByRecieverQuery({ variables: { auth, status: Status.WildCard } });
  const { refetch: refetchByInviter } = useGetInvitesByInviterQuery({ variables: { auth, status: Status.WildCard } });
  const checkNotification = async () => {
    try {
      setContacts([]);
      refetchByReciever({
        auth,
        status: Status.WildCard,
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
  }, [invite.notificationNumber, loading]);

  useEffect(() => {
    checkNotification();

    ws.ws?.on('friend_request', () => {
      checkNotification();
    });
    ws.ws?.on('send_friend_request', () => {
      refetchByInviter();
      refetchByReciever();
      checkNotification();
    });
    return () => {
      ws.ws?.off('send_friend_request');
    };
  }, []);
};
