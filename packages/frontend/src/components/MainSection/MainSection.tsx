/* eslint-disable no-unused-vars */
// components
import { css, cx } from '@emotion/css';
import { CloseButton, Flex, Slide, useColorModeValue, VStack } from '@chakra-ui/react';
import ActiveChats from './ActiveChats';
import FindFriends from './FindFriends';
import ChatSettings from './ChatSettings';
// other
import useThemeColors from '../../hooks/useThemeColors';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleChatSettings } from 'services/redux/reducer/toggles/actions';
import { useGetChatListQuery } from 'services/generated';
import useProvideAuth from 'hooks/useSession';
import { useEffect } from 'react';

interface IMainSection extends ReturnType<typeof mapStateToProps> {
  chatId: string;
  toggleChatSettings: typeof toggleChatSettings;
}

function MainSection(props: IMainSection) {
  const { chatId, ws, toggle, toggleChatSettings } = props;
  const { auth } = useProvideAuth();
  const {
    base: {
      default: { color, offColor },
      form: { background },
    },
  } = useThemeColors();
  const { data, refetch } = useGetChatListQuery({ variables: { auth } });
  const { getAllChats } = data || {};
  if (getAllChats?.__typename === 'Error') throw new Error(getAllChats.message);

  useEffect(() => {
    ws.ws?.on('friend_request', () => {
      refetch();
    });
    return () => {
      ws.ws?.off('friend_request');
    };
  }, []);

  return (
    <VStack
      mr="-0.5rem !important"
      ml="-0.5rem !important"
      w={{ base: !toggle.toggleMobileNav ? 0 : '102%', xl: '50%', '2xl': '40%' }}
      h="100vh"
      pos={{ base: 'absolute', lg: 'relative' }}
      bg={background}
      borderRight={useColorModeValue('1px solid rgba(0, 0, 0, 0.1)', '1px solid rgba(255,255,255, 0.1)')}
      textAlign="center"
      overflow="hidden"
      zIndex="20"
      align="center"
      justifyItems="center"
      title="main_section"
    >
      <FindFriends />
      <VStack overflow="auto" w="94%" h="100vh">
        <Slide style={{ zIndex: 10, width: '100%' }} direction="left" in={toggle.toggleChatSettings}>
          <VStack
            w={{ base: !toggle.toggleMobileNav ? 0 : '102%', xl: '50%', '2xl': '35%' }}
            h="100vh"
            top={0}
            left={0}
            transition="0.34s"
            zIndex={11}
            bg={background}
            color="white"
            p={0}
          >
            <Flex ml="2rem" align="center" pos="relative" w="95%" m="1rem" px="1rem">
              <CloseButton
                size="lg"
                className={cx(css`
                  width: 3rem;
                  height: 3rem;
                  cursor: pointer;
                  right: 0;
                  margin-top: 2.5rem;
                  color: ${color};
                  position: absolute;
                  color: ${color};
                  background: ${offColor};
                  z-index: 9999;
                `)}
                onClick={() => {
                  toggleChatSettings(!toggle.toggleChatSettings);
                }}
              />
            </Flex>
            <ChatSettings chatId={chatId} />
          </VStack>
        </Slide>
        {getAllChats?.res.map((item, index) => (
          <ActiveChats key={index} {...item} chatId={chatId} />
        ))}
      </VStack>
    </VStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
  ws: state.ws,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleChatSettings: bindActionCreators(toggleChatSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
