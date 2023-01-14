import { Avatar, AvatarGroup, HStack, IconButton, VStack } from '@chakra-ui/react';
import useProvideAuth from 'hooks/useSession';
import { FC, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useGetMessageListQuery, useGetUserListQuery } from 'services/generated';
import useThemeColors from 'hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleChatSettings } from 'services/redux/reducer/toggles/actions';
import { connect } from 'react-redux';
import s from './ActiveChatDetails.module.css';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { useCookie } from 'next-cookie';

interface IActiveChatDetails extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  _id: string;
  chatId: string;
  members: string[];
}

const ActiveChatDetails: FC<IActiveChatDetails> = ({ members, ws, _id, chatId, toggle, toggleChatSettings }) => {
  const { users } = useGetUsers(members);
  const lastMessage = useGetLastMessage(_id, ws);

  const {
    base: {
      default: { color },
    },
  } = useThemeColors();
  return (
    <div className={s.container}>
      <HStack>
        <VStack align="flex-start">
          <div className={s.avatarContainer}>
            <AvatarGroup size="md" max={2}>
              {users?.map(({ _id, userAvatar, username }) => {
                return (
                  <HStack key={_id} alignItems="center" justifyContent="center">
                    <Avatar background="white" name={username} src={userAvatar} />
                  </HStack>
                );
              })}
            </AvatarGroup>
          </div>
          <p style={{ color }} className={s.lastMessage}>
            {lastMessage}
          </p>
        </VStack>
      </HStack>
      {_id === chatId && (
        <IconButton
          borderRadius="full"
          aria-label=""
          icon={
            <BsThreeDots
              style={{ color, boxShadow: `0px 0px 2px 0px ${color}` }}
              className={s.activeChatSettingsBtn}
              onClick={() => toggleChatSettings(!toggle.toggleChatSettings)}
            />
          }
        />
      )}
    </div>
  );
};

const useGetUsers = (members: string[]) => {
  const { auth } = useProvideAuth();
  const { data } = useGetUserListQuery({ variables: { auth, userIds: members } });
  const { getUserList } = data || {};
  if (getUserList?.__typename === 'Error') throw new Error(getUserList.message);
  const { res: users } = getUserList || {};

  return { users };
};

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
  ws: state.ws,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleChatSettings: bindActionCreators(toggleChatSettings, dispatch),
});

const useGetLastMessage = (chat_id: string, ws: IWebSocket) => {
  const { auth } = useProvideAuth();
  const cookie = useCookie();
  const { data, loading, refetch } = useGetMessageListQuery({ variables: { auth, chat_id, query: { page_size: 1, page_number: 1 } } });
  useEffect(() => {
    ws.ws?.on('message', () => refetch());
    return () => {
      ws.ws?.off('message');
    };
  }, []);
  if (loading) return '';
  const { getAllMessages } = data || {};
  if (getAllMessages?.__typename === 'Error') return '';

  const { res: messages } = getAllMessages || {};
  const [{ message, sender }] = messages || [];
  return `${sender === cookie.get('name') ? 'You:' : ''} ${message}`;
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChatDetails);
