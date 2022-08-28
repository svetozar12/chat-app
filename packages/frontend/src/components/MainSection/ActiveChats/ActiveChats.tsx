import React from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { css, cx } from '@emotion/css';
import { useCookie } from 'next-cookie';
import { Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import Avatar from '../../Avatar';
import useThemeColors from '../../../hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { toggleChatSettings, toggleCreateGroup } from 'services/redux/reducer/toggles/actions';
import { Chat } from '@chat-app/graphql-server';

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
  const router = useRouter();
  const cookie = useCookie();

  const cookieName: string = cookie.get('name');
  const user1 = members?.[0];
  const user2 = members?.[1];

  const joinChat = () => {
    ws.ws?.emit('join_chat', {
      rooms: [cookieName, chatId],
    });
    router.push(`${_id}`);
  };

  React.useEffect(() => {
    joinChat();
    const notMe = members?.filter((element) => element !== cookieName);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setInviter(notMe[0]);
  }, []);

  const {
    colors: { color },
  } = useThemeColors();

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
          <Avatar members={members as string[]} />
          <VStack align="flex-start">
            <div
              className={css`
                margin: 0;
                color: black;
                display: flex;
              `}
            >
              {members && members.length > 2
                ? members.map((element, index) => {
                    if (index === 3) return null;
                    return (
                      <Heading color={color} size="md" style={{ margin: 0 }} key={index}>
                        {element}
                        {element?.[members.length - 1] === element?.[index] ? `${members.length > 3 ? '...' : ''}` : ','}
                      </Heading>
                    );
                  })
                : (members && members.length === 1 && (
                    <Heading color={color} size="md" m={0}>
                      {user1}
                    </Heading>
                  )) ||
                  (user2 === cookieName && (
                    <Heading color={color} size="md" m={0}>
                      {user1}
                    </Heading>
                  )) ||
                  (user1 === cookieName && (
                    <Heading color={color} size="md" m={0}>
                      {user2}
                    </Heading>
                  ))}
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
            boxShadow="box-shadow: 0 0 5px main_black"
            icon={
              <BsThreeDots
                className={css`
                  width: 2rem;
                  height: 2rem;
                  color: ${color};
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
