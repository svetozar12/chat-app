import { IconButton, Menu, MenuButton, Spacer, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import UserSettings from 'components/MainSection/FindFriends/FindFriendsHeader/UserSettings';
import { renderItems } from 'components/Sidebar/utils';
import useThemeColors from 'hooks/useThemeColors';
import { FC } from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import { MdOutlineDarkMode } from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SingleAvatar } from 'services/chat-ui';
import ToolTip from 'services/chat-ui/ToolTip';
import { STATE } from 'services/redux/reducer';
import { toggleFriendRequestAction } from 'services/redux/reducer/toggles/actions';
import s from './Sidebar.module.css';

type SidebarProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Sidebar: FC<SidebarProps> = ({ toggle, toggleFriendRequest }) => {
  const {
    base: {
      default: { color },
      form: { background },
    },
  } = useThemeColors();
  const { toggleColorMode } = useColorMode();

  return (
    <VStack
      height="100vh"
      bg={background}
      zIndex={999}
      w="4rem"
      borderRight={useColorModeValue('1px solid rgba(0, 0, 0, 0.1)', '1px solid rgba(255,255,255, 0.1)')}
    >
      <VStack gap={2}>
        {renderItems(
          toggleFriendRequest,
          toggle.toggleFriendReqModal,
          toggleColorMode,
          useColorModeValue(MdOutlineDarkMode, BsFillSunFill),
        ).map((item, index) => {
          const { Icon, onClick, ariaLabel } = item;
          return (
            <ToolTip label={ariaLabel} key={index}>
              <IconButton mt={4} aria-label={ariaLabel} icon={<Icon className={s.icon} />} onClick={onClick} />
            </ToolTip>
          );
        })}
      </VStack>
      <Spacer />
      <Menu>
        <MenuButton
          style={{ height: 'unset' }}
          m="0 !important"
          as={IconButton}
          background="transparent"
          _hover={{ background: 'transparent' }}
          _active={{ background: 'transparent' }}
        >
          <SingleAvatar
            width="2.5rem"
            height="2.5rem"
            chakraProps={{
              marginBottom: '1rem !important',
              background: 'white',
              cursor: 'pointer',
              _hover: { boxShadow: `0px 0px 7px 0px ${color}` },
            }}
          />
        </MenuButton>
        <UserSettings />
      </Menu>
    </VStack>
  );
};

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleFriendRequest: bindActionCreators(toggleFriendRequestAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
