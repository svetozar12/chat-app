import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { css, cx } from '@emotion/css';
import { useCookie } from 'next-cookie';
import { HStack } from '@chakra-ui/react';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleCreateGroup } from 'services/redux/reducer/toggles/actions';
import { Chat } from 'services/generated';
import ActiveChatDetails from 'components/MainSection/ActiveChats/subcomponents/ActiveChatDetails/ActiveChatDetails';

interface IActiveChats extends Chat, ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  chatId: string;
}

const ActiveChats: FC<IActiveChats> = ({ _id, members, ws, toggleCreateGroup }) => {
  const router = useRouter();
  const cookie = useCookie();
  const cookieName: string = cookie.get('name');
  const { acc } = router.query;
  const chatId = acc as string;

  useEffect(() => {
    joinChat();
    return () => {
      ws.ws?.off('join_chat');
    };
  }, []);

  function joinChat() {
    router.push(`${_id}`).then(() => {
      ws.ws?.emit('join_chat', {
        rooms: [cookieName, _id],
      });
    });
  }

  return (
    <HStack
      w="full"
      cursor="pointer"
      p="2rem"
      ml="4rem"
      whiteSpace="nowrap"
      transition="0.2s"
      borderRadius="2xl"
      _hover={{ borderRadius: '15px', background: ' rgba(122, 122, 122, 0.1)', transition: '0.2s' }}
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
      <ActiveChatDetails _id={_id} chatId={chatId} members={members} />
    </HStack>
  );
};

const mapStateToProps = (state: STATE) => ({
  ws: state.ws,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCreateGroup: bindActionCreators(toggleCreateGroup, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChats);
