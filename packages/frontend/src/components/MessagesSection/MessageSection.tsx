import React, { FC, useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
// components
import { Box, HStack } from '@chakra-ui/react';
import ChatRoom from './ChatRoom';
import Notifications from '../Notifications';
// services
import { STATE } from 'services/redux/reducer';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { Invite, useGetChatQuery } from 'services/generated';
import useProvideAuth from 'hooks/useSession';

interface Props {
  contacts: Invite[];
  chatId: string;
  toggle: IToggle;
}

const MessageSection: FC<Props> = ({ chatId, contacts, toggle }) => {
  const [users, setUsers] = useState<any[]>([]);
  useMemberSuggestions(setUsers);
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
          {toggle.toggleFriendReqModal && contacts && <Notifications contacts={contacts} />}
          {/* {toggle.toggleInvideModal && <AddUsers_Modal users={users} setUsers={setUsers} chatId={chatId} />} */}
          <ChatRoom chatId={chatId} />
        </Box>
      </div>
    </HStack>
  );
};

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const useMemberSuggestions = (setUsers: React.Dispatch<React.SetStateAction<any[]>>) => {
  const route = useRouter();
  const { auth } = useProvideAuth();
  const { acc } = route.query;
  const { data: chatData } = useGetChatQuery({
    ssr: false,
    variables: { chat_id: acc as string, auth },
  });
  const getMembersSuggestions = async () => {
    try {
      const { getChatById } = chatData || {};
      if (getChatById?.__typename === 'Error') throw new Error(getChatById.message);
      const { members } = getChatById || {};

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
      uniqueUsers = uniqueUsers.filter((element) => !members?.includes(element));
      setUsers(uniqueUsers);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    getMembersSuggestions();
  }, [route.asPath]);
};

export default connect(mapStateToProps)(MessageSection);
