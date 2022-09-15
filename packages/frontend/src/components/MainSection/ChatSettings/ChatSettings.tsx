import { css, cx } from '@emotion/css';
import React from 'react';
import { useRouter } from 'next/router';
import { AiOutlineUserDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { useCookie } from 'next-cookie';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import generic from '../../../utils/generic';
// services
import s from './ChatSettings.module.css';
import useThemeColors from '../../../hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleInviteModal } from 'services/redux/reducer/toggles/actions';
import { connect } from 'react-redux';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { IToggle } from 'services/redux/reducer/toggles/state';
import sdk from 'services/sdk';

interface IChatSettings {
  chatId: string;
  ws: IWebSocket;
  toggle: IToggle;
  toggleInviteModal: typeof toggleInviteModal;
}

function ChatSettings(props: IChatSettings) {
  const { chatId, ws, toggle } = props;
  const [users, setUsers] = React.useState<string[]>([]);
  const route = useRouter();
  const cookie = useCookie();
  const id: string = cookie.get('id');
  const token: string = cookie.get('token');

  const emitFriendRequest = async () => {
    ws.ws?.emit('friend_request');
  };
  const getMembers = async () => {
    try {
      const res = await sdk.chat.getChatById({ auth: { userId: id, AccessToken: token }, chat_id: chatId });
      const {
        getChatById: { members },
      } = res;
      setUsers(members);
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteMember = async (user: string) => {
    try {
      await sdk.chat.updateChat({ auth: { userId: id, AccessToken: token }, chat_id: chatId, username: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    setUsers([]);
    getMembers();
    ws.ws?.on('inviting_multiple_users', ({ users }) => {
      setUsers((prev) => [...prev, ...users]);
    });
  }, [route.asPath]);

  const redirect = async (user: string) => {
    const updatedUsers = users.filter((element) => element !== user);
    setUsers(updatedUsers);
    if (updatedUsers.length === 2) {
      const redirect: { _id: string } = await generic.getFirstChat(id, token);

      route.push(`/${redirect._id}`);
    }
  };

  const {
    colors: { color },
  } = useThemeColors();

  return (
    <VStack mt={5} gap={5} pos="relative" transition="ease" w="full" opacity={toggle.toggleChatSettings ? 1 : 0}>
      <Heading w="70%" color={color} textAlign="center" whiteSpace="nowrap" fontSize={{ base: '4vw', md: '2vw' }}>
        Members in chat
      </Heading>

      {users.map((item, index) => (
        <HStack alignItems="center" key={index}>
          <Heading>{item}</Heading>
          <AiOutlineUserDelete
            onClick={() => {
              deleteMember(item);
              emitFriendRequest();
              redirect(item);
            }}
            className={s.removeUser}
          />
        </HStack>
      ))}
      {users.length > 2 && (
        <div
          onClick={() => toggleInviteModal(!toggle.toggleInvideModal)}
          className={cx(
            'flex',
            css`
              position: relative;
              z-index: 101;
              width: 2rem;
              height: 2rem;
              cursor: pointer;
              padding: 2rem 0.5rem;
              border-radius: 5px;
              justify-content: space-between;
              width: 70%;
              height: 2rem;
              whitespace: nowrap;
              &:hover {
                background: rgba(0, 0, 0, 0.1);
              }
            `,
          )}
        >
          <h2
            className={css`
              color: var(--main-black);
              margin: 0;
              @media (max-width: 1344px) {
                font-size: 1.5vw;
                word-break: keep-all;
              }
            `}
          >
            Add more users
          </h2>
          <div className="flex">
            <AiOutlinePlusCircle
              className={css`
                width: 2rem;
                height: 2rem;
              `}
            />
          </div>
        </div>
      )}
    </VStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  ws: state.ws,
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleInviteModal: bindActionCreators(toggleInviteModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatSettings);
