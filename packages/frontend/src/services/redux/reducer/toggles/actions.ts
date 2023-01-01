import { ActionType } from 'services/redux/types';

const toggleFriendRequestAction = (toggle: boolean) => ({
  type: ActionType.TOGGLE_FRIEND_REQUEST,
  payload: toggle,
});

const toggleUserSettings = (toggle: boolean) => ({
  type: ActionType.TOGGLE_USER_SETTINGS,
  payload: toggle,
});

const toggleCreateGroup = (toggle: boolean) => ({
  type: ActionType.TOGGLE_CREATE_GROUP,
  payload: toggle,
});

const toggleQuickLogin = (toggle: boolean) => ({
  type: ActionType.TOGGLE_QUICK_LOGIN,
  payload: toggle,
});

const toggleMessageSettings = (toggle: boolean) => ({
  type: ActionType.TOGGLE_SETTINGS,
  payload: toggle,
});

const toggleMobileNav = (toggle: boolean) => ({
  type: ActionType.TOGGLE_MOBILE_NAV,
  payload: toggle,
});

const toggleChatSettings = (toggle: boolean) => ({
  type: ActionType.TOGGLE_CHAT_SETINGS,
  payload: toggle,
});

const toggleIsMatch = (toggle: boolean) => ({
  type: ActionType.TOGGLE_IS_MATCH,
  payload: toggle,
});

const toggleInviteModal = (toggle: boolean) => ({
  type: ActionType.TOGGLE_MODAL_INVITE,
  payload: toggle,
});

const toggleIsLogedIn = (toggle: boolean) => ({
  type: ActionType.TOGGLE_IS_LOGEDIN,
  payload: toggle,
});

const togglelIsLoading = (toggle: boolean) => ({
  type: ActionType.TOGGLE_IS_LOADING,
  payload: toggle,
});

export {
  toggleFriendRequestAction,
  toggleUserSettings,
  toggleCreateGroup,
  toggleMobileNav,
  toggleChatSettings,
  toggleIsMatch,
  toggleInviteModal,
  toggleIsLogedIn,
  togglelIsLoading,
  toggleMessageSettings,
  toggleQuickLogin,
};
