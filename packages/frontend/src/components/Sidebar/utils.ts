import { IoNotifications } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { toggleFriendRequestAction } from 'services/redux/reducer/toggles/actions';
type RenderItems = { Icon: IconType; onClick: () => any; ariaLabel: string }[];

export const renderItems = (
  toggleFriendRequest: typeof toggleFriendRequestAction,
  toggleFriend: boolean,
  toggleColorMode: () => void,
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
];
