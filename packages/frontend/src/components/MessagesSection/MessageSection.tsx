import React from 'react';
import { css, cx } from '@emotion/css';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
// components
import { useCookie } from 'next-cookie';
import { Box, HStack } from '@chakra-ui/react';
import ChatRoom from './ChatRoom';
import Notifications_Modal from '../Notifications_Modal';
import AddUsers_Modal from '../AddUsers_Modal';
// services
import { useAuth } from 'utils/SessionProvider';
import SkelletonUserMessages from '../Loading/SkelletonUserMessages';
import { STATE } from 'services/redux/reducer';
import { IToggle } from 'services/redux/reducer/toggles/state';
import sdk from 'services/sdk';
import { Status, Invite } from 'services/generated/graphql';

interface IMessageSection {
  contacts: Invite[];
  FetchInvites: (status: Status, InvitesOrigin: 'reciever' | 'inviter') => Promise<any>;
  chatId: string;
  toggle: IToggle;
}

function MessageSection(props: IMessageSection) {
  const { contacts, chatId, toggle, FetchInvites } = props;
  const [users, setUsers] = React.useState<any[]>([]);
  const cookie = useCookie();
  const route = useRouter();
  const { user } = useAuth();
  const getMembersSuggestions = async () => {
    try {
      const res = await sdk.chatroom.getById({
        chat_id: window.location.pathname,
        auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') },
      });
      const { members } = res;

      const data: any[] = [];
      const usersArr: string[] = [];
      data.forEach((element) => {
        usersArr.push(element.inviter);
        usersArr.push(element.reciever);
      });
      let uniqueUsers: string[] = [];
      usersArr.forEach((element) => {
        if (!uniqueUsers.includes(element)) {
          uniqueUsers.push(element);
        }
      });
      uniqueUsers = uniqueUsers.filter((element) => !members.includes(element));
      setUsers(uniqueUsers);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getMembersSuggestions();
  }, []);

  React.useEffect(() => {
    getMembersSuggestions();
  }, [route.asPath]);

  return (
    <HStack
      w="71%"
      title="message_section"
      className={cx(
        'flex',
        css`
          width: 71%;
          @media (max-width: 1008px) {
            width: 100%;
            margin-top: 0 !important;
          },`,
      )}
    >
      <div
        className={cx(
          css`
            width: 100%;
            height: 100vh;
            justify-content: center;
            alignitems: center;
            padding: 0;
          `,
          'container',
        )}
      >
        <Box w="full" h="100vh">
          {toggle.toggleFriendReqModal && contacts && <Notifications_Modal contacts={contacts} />}
          {toggle.toggleInvideModal && <AddUsers_Modal users={users} setUsers={setUsers} chatId={chatId} />}
          {user ? <ChatRoom chatId={chatId} /> : <SkelletonUserMessages />}
        </Box>
      </div>
    </HStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   incrementPagination: bindActionCreators(incrementPaginationNumberAction, dispatch),
//   setMessages: bindActionCreators(setMessagesAction, dispatch),
//   setPaginatedMessages: bindActionCreators(setPaginatedMessagesAction, dispatch),
//   toggleIsMatch: bindActionCreators(toggleIsMatch, dispatch),
//   resetMessages: bindActionCreators(resetMessagesAction, dispatch),
// });

export default connect(mapStateToProps)(MessageSection);
