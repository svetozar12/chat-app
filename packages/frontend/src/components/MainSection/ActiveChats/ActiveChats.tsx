import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { css, cx } from '@emotion/css';
import { useCookie } from 'next-cookie';
import { Avatar, AvatarGroup, Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import useThemeColors from '../../../hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { toggleChatSettings, toggleCreateGroup } from 'services/redux/reducer/toggles/actions';
import { Chat, useGetUserListQuery } from 'services/generated';
import useProvideAuth from 'hooks/useSession';

interface IActiveChats extends Chat {
  chatId: string;
  toggle: IToggle;
  ws: IWebSocket;
  toggleCreateGroup: typeof toggleCreateGroup;
  toggleChatSettings: typeof toggleChatSettings;
}

function ActiveChats(props: IActiveChats) {
  const { _id, members, chatId, toggle, ws, toggleCreateGroup, toggleChatSettings } = props;
  const [inviter, setInviter] = React.useState<string>('');
  const { auth } = useProvideAuth();
  const { data } = useGetUserListQuery({ variables: { auth, userIds: members } });
  const { getUserList } = data || {};
  if (getUserList?.__typename === 'Error') throw new Error(getUserList.message);
  const { res: users } = getUserList || {};
  const {
    base: {
      default: { color },
    },
  } = useThemeColors();
  const router = useRouter();
  const cookie = useCookie();

  const cookieName: string = cookie.get('name');

  const joinChat = () => {
    ws.ws?.emit('join_chat', {
      rooms: [cookieName, chatId],
    });
    router.push(`${_id}`);
  };

  useEffect(() => {
    joinChat();
    const notMe = members?.filter((element) => element !== cookieName);
    setInviter(notMe[0]);
    return () => {
      ws.ws?.off('join_chat');
    };
  }, []);

  return (
    <HStack
      w="full"
      cursor="pointer"
      p="2rem"
      ml="2rem"
      whiteSpace="nowrap"
      transition="0.2s"
      borderRadius="2xl"
      _hover={{ borderRadius: '15px', background: ' rgba(122, 122, 122, 0.1)', transition: '0.2s' }}
      data-testid="chat"
      onClick={() => {
        joinChat();
        toggleCreateGroup(false);
      }}
      className={cx({
        [css`
          border-radius: 15px;
          background: rgba(122, 122, 122, 0.1);
        `]: _id === chatId,
      })}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <HStack>
          <VStack align="flex-start">
            <div
              className={css`
                margin: 0;
                color: black;
                display: flex;
              `}
            >
              <AvatarGroup size="md" max={2}>
                {users?.map(({ _id, email, userAvatar, username }) => {
                  return (
                    <HStack key={username} alignItems="center" justifyContent="center">
                      <Avatar name={username} src={userAvatar} />
                      <Heading color={color}>{username}</Heading>
                    </HStack>
                  );
                })}
              </AvatarGroup>
            </div>
            <p
              className={css`
                margin: 0;
                color: ${color};
                justify-content: flex-start;
                align-items: center;
                margin: 1rem 0;
              `}
            >
              Last message...
            </p>
          </VStack>
        </HStack>
        {_id === chatId && (
          <IconButton
            borderRadius="full"
            aria-label=""
            icon={
              <BsThreeDots
                className={css`
                  border-radius: 50%;
                  width: 2.5rem;
                  height: 2.5rem;
                  color: ${color};
                  box-shadow: 0px 0px 2px 0px ${color};
                `}
                onClick={() => toggleChatSettings(!toggle.toggleChatSettings)}
              />
            }
          />
        )}
      </div>
    </HStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
  ws: state.ws,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCreateGroup: bindActionCreators(toggleCreateGroup, dispatch),
  toggleChatSettings: bindActionCreators(toggleChatSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChats);
