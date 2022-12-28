/* eslint-disable no-unused-vars */
import React from 'react';
// components
import { css, cx } from '@emotion/css';
import { CloseButton, Flex, HStack, Slide, useColorModeValue, VStack } from '@chakra-ui/react';
import ActiveChats from './ActiveChats';
import FindFriends from './FindFriends';
import ChatSettings from './ChatSettings';
// other
import { useAuth } from '../../utils/SessionProvider';
import useThemeColors from '../../hooks/useThemeColors';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleChatSettings } from 'services/redux/reducer/toggles/actions';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { Chat } from 'services/generated/graphql';

interface IMainSection {
  chatId: string;
  chatRooms: Chat[];
  toggle: IToggle;
  toggleChatSettings: typeof toggleChatSettings;
}

function MainSection(props: IMainSection) {
  const { chatRooms, chatId, toggle, toggleChatSettings } = props;
  const { user } = useAuth();
  const {
    base: {
      default: { color, offColor },
      form: { background },
    },
  } = useThemeColors();
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
      {user ? (
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
          {chatRooms.map((item, index) => (
            <ActiveChats key={index} {...item} chatId={chatId} />
          ))}
        </VStack>
      ) : (
        <div>loading</div>
      )}
    </VStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleChatSettings: bindActionCreators(toggleChatSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
