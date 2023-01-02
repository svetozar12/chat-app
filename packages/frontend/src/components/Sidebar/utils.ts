import { useColorModeValue } from '@chakra-ui/react';
import { IoNotifications } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { toggleFriendRequestAction } from 'services/redux/reducer/toggles/actions';
import { BiGroup } from 'react-icons/bi';
type RenderItems = { Icon: IconType; onClick: () => any; ariaLabel: string }[];

export const renderItems = (
  toggleFriendRequest: typeof toggleFriendRequestAction,
  toggleFriend: boolean,
  toggleColorMode: () => void,
  toggleGroup: () => void,
  ChangeThemeIcon: IconType,
): RenderItems => [
  {
    Icon: IoNotifications,
    onClick: () => toggleFriendRequest(!toggleFriend),
    ariaLabel: 'opens chats requests',
  },
  {
    Icon: ChangeThemeIcon,
    onClick: toggleColorMode,
    ariaLabel: 'Change theme',
  },
  {
    Icon: BiGroup,
    onClick: toggleGroup,
    ariaLabel: 'toggle group',
  },
];
