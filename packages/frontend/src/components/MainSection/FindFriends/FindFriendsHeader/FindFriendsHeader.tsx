import { css } from '@emotion/css';
import React from 'react';
// icons
import { MdDarkMode } from 'react-icons/md';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsFillSunFill, BsThreeDots } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
// services
import { useCookie } from 'next-cookie';
import {
  Center,
  Circle,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Image,
  useColorMode,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import s from './FindFriendsHeader.module.css';
// hooks
import UserSettings from './UserSettings';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  toggleChatSettings,
  toggleCreateGroup,
  toggleFriendRequestAction,
  toggleMobileNav,
  toggleUserSettings,
} from 'services/redux/reducer/toggles/actions';
import { STATE } from 'services/redux/reducer';
import { IToggle } from 'services/redux/reducer/toggles/state';
import IInvite from 'services/redux/reducer/invites/state';
import sdk from 'services/sdk';

interface IFindFriendsHeader {
  toggle: IToggle;
  invite: IInvite;
  toggleChatSettings: typeof toggleChatSettings;
  toggleMobileNav: typeof toggleMobileNav;
  toggleCreateGroup: typeof toggleCreateGroup;
  toggleFriendRequest: typeof toggleFriendRequestAction;
  toggleUserSettings: typeof toggleUserSettings;
}

function FindFriendsHeader(props: IFindFriendsHeader) {
  const { toggle, invite, toggleChatSettings, toggleCreateGroup, toggleMobileNav, toggleFriendRequest, toggleUserSettings } = props;
  const cookie = useCookie();
  const userId: string = cookie.get('id');
  const token: string = cookie.get('token');

  const { toggleColorMode } = useColorMode();
  const [image, setImage] = React.useState('');

  const getUserImage = async () => {
    try {
      const res = await sdk.user.getUser({ auth: { userId, AccessToken: token } });
      const {
        getUser: { userAvatar },
      } = res;

      setImage(userAvatar);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getUserImage();
  }, []);

  const toggleGroupCreate = () => {
    toggleChatSettings(false);
    toggleCreateGroup(!toggle.toggleCreateGroupModal);
    toggleMobileNav(!toggleMobileNav);
  };

  return (
    <>
      <div
        className={css`
          width: 95%;
          height: 3rem;
          margin-bottom: 1rem;
          position: relative;
        `}
      />
      <HStack w="99%" pos="relative" minW="300px" pb="1rem">
        <Flex align="center">
          <Image
            alt="user_avatar"
            src={image}
            w="5rem"
            h="5rem"
            mr="1rem"
            borderRadius="full"
            pos="relative"
            zIndex={10}
            color="var(--main-logo-color)"
          />
          <Heading size="md" whiteSpace="nowrap">
            Chats
          </Heading>
        </Flex>

        <Spacer />
        <HStack gap={{ base: 0, md: 5 }} w="50%">
          <Center w="25%" onClick={toggleColorMode}>
            {useColorModeValue(
              <IconButton w="full" h="3rem" aria-label="" icon={<BsFillSunFill className={s.icon} />} />,
              <IconButton w="full" h="3rem" aria-label="" icon={<MdDarkMode className={s.icon} />} />,
            )}
          </Center>
          <Center w="25%" pos="relative" onClick={() => toggleFriendRequest(!toggle.toggleFriendReqModal)}>
            <IconButton w="full" h="3rem" aria-label="button for recieved invites" icon={<IoNotifications className={s.icon} />} />
            {invite.notificationNumber > 0 && (
              <Circle
                display="flex"
                justifyContent="center"
                alignItems="center"
                pos="absolute"
                right={0}
                top={0}
                bg="red"
                borderRadius="full"
                size="1.2rem"
                fontWeight="semibold"
                color="white"
              >
                {invite.notificationNumber}
              </Circle>
            )}
          </Center>
          <Center onClick={toggleGroupCreate} w="25%">
            <IconButton w="full" h="3rem" aria-label="creates group chat" icon={<AiOutlineUsergroupAdd className={s.icon} />} />
          </Center>
          <Center w="25%" pos="relative" onClick={() => toggleUserSettings(toggle.toggleUserSettings)}>
            <AnimatePresence>
              {toggle.toggleUserSettings && (
                <motion.div
                  className={s.box}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'tween' }}
                  initial={{ scale: 0.2 }}
                  exit={{ scale: 0.2 }}
                >
                  <UserSettings />
                </motion.div>
              )}
            </AnimatePresence>
            <IconButton w="full" h="3rem" aria-label="open user settings" icon={<BsThreeDots className={s.icon} />} />
          </Center>
        </HStack>
      </HStack>
      <Divider />
    </>
  );
}

const mapStateToProps = (state: STATE) => ({
  invite: state.invite,
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleChatSettings: bindActionCreators(toggleChatSettings, dispatch),
  toggleCreateGroup: bindActionCreators(toggleCreateGroup, dispatch),
  toggleMobileNav: bindActionCreators(toggleMobileNav, dispatch),
  toggleFriendRequest: bindActionCreators(toggleFriendRequestAction, dispatch),
  toggleUserSettings: bindActionCreators(toggleUserSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FindFriendsHeader));
