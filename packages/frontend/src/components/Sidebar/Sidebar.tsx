import { IconButton, Spacer, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import UserSettings from 'components/MainSection/FindFriends/FindFriendsHeader/UserSettings';
import useThemeColors from 'hooks/useThemeColors';
import React from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
import { MdOutlineDarkMode } from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SingleAvatar } from 'services/chat-ui';
import { STATE } from 'services/redux/reducer';
import {
  toggleChatSettings,
  toggleCreateGroup,
  toggleFriendRequestAction,
  toggleMobileNav,
  toggleUserSettings,
} from 'services/redux/reducer/toggles/actions';
import { IToggle } from 'services/redux/reducer/toggles/state';
import s from './Sidebar.module.css';

interface ISidebar {
  toggle: IToggle;
  toggleFriendRequest: typeof toggleFriendRequestAction;
  toggleCreateGroup: typeof toggleCreateGroup;
  toggleMobileNav: typeof toggleMobileNav;
  toggleUserSettingsAction: typeof toggleUserSettings;
}

const Sidebar = (props: ISidebar) => {
  const { toggle, toggleFriendRequest, toggleCreateGroup, toggleMobileNav, toggleUserSettingsAction } = props;
  const {
    base: {
      default: { color },
      form: { background },
    },
  } = useThemeColors();
  const { toggleColorMode } = useColorMode();

  const toggleGroupCreate = () => {
    toggleChatSettings(false);
    toggleCreateGroup(!toggle.toggleCreateGroupModal);
    toggleMobileNav(!toggleMobileNav);
  };

  const renderItems = [
    {
      Icon: IoNotifications,
      onClick: () => toggleFriendRequest(!toggle.toggleFriendReqModal),
      ariaLabel: 'opens chats requests',
    },
    {
      Icon: useColorModeValue(BsFillSunFill, MdOutlineDarkMode),
      onClick: toggleColorMode,
      ariaLabel: ' Change theme',
    },
  ];

  return (
    <VStack
      height="100vh"
      bg={background}
      zIndex={999}
      w="4rem"
      borderRight={useColorModeValue('1px solid rgba(0, 0, 0, 0.1)', '1px solid rgba(255,255,255, 0.1)')}
    >
      <VStack gap={2}>
        {renderItems.map((item, index) => {
          const { Icon, onClick, ariaLabel } = item;
          return <IconButton mt={4} key={index} aria-label={ariaLabel} icon={<Icon className={s.icon} />} onClick={onClick} />;
        })}
      </VStack>
      <Spacer />
      <VStack pos="relative">
        {toggle.toggleUserSettings && <UserSettings />}
        <SingleAvatar
          baseProps={{ onClick: () => toggleUserSettingsAction(!toggle.toggleUserSettings) }}
          width="2.5rem"
          height="2.5rem"
          chakraProps={{ marginBottom: '1rem !important', cursor: 'pointer', _hover: { boxShadow: `0px 0px 7px 0px ${color}` } }}
        />
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state: STATE) => ({
  invite: state.invite,
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleFriendRequest: bindActionCreators(toggleFriendRequestAction, dispatch),
  toggleCreateGroup: bindActionCreators(toggleCreateGroup, dispatch),
  toggleMobileNav: bindActionCreators(toggleMobileNav, dispatch),
  toggleChatSettings: bindActionCreators(toggleChatSettings, dispatch),
  toggleUserSettingsAction: bindActionCreators(toggleUserSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
