/* eslint-disable no-unused-vars */
import React from 'react';
// components
import { css, cx } from '@emotion/css';
import { CloseButton, Flex, Slide, VStack } from '@chakra-ui/react';
import ActiveChats from './ActiveChats';
import FindFriends from './FindFriends';
import ChatSettings from './ChatSettings';
// other
import { useAuth } from '../../utils/SessionProvider';
// import { IInitialSet } from 'services/redux/reducer/setReducer/state';
import { Ichats } from '../../pages/[acc]';
import useThemeColors from '../../hooks/useThemeColors';

interface IMainSection {
  chatId: string;
  chatRooms: Ichats[];
}

function MainSection({ chatRooms, chatId }: IMainSection) {
  // const dispatch = useDispatch();
  // const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const { user } = useAuth();
  const {
    colors: { fromBg, color },
  } = useThemeColors();

  return (
    <VStack
      mr="-0.5rem !important"
      ml="-0.5rem !important"
      // w={{ base: !state.setMobileNav ? 0 : '102%', xl: '50%', '2xl': '40%' }}
      h="100vh"
      pos={{ base: 'absolute', lg: 'relative' }}
      bg={fromBg}
      borderRight="1px solid rgba(0, 0, 0, 0.1)"
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
          <Slide style={{ zIndex: 10, width: '100%' }} direction="left" in>
            <VStack
              // w={{ base: !state.setMobileNav ? 0 : '102%', xl: '50%', '2xl': '35%' }}
              h="100vh"
              top={0}
              left={0}
              transition="0.34s"
              zIndex={11}
              bg={fromBg}
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
                    position: absolute;
                    background:${color},
                    z-index: 9999;
                  `)}
                  // onClick={() =>
                  //   dispatch({
                  //     type: 'SET_CHAT_SETTINGS',
                  //     payload: !state.setChatSettings,
                  //   })
                  // }
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
        // <SkeletonActiveInvites />
      )}
    </VStack>
  );
}

export default MainSection;
