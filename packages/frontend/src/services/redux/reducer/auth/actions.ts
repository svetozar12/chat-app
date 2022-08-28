import { ActionType } from 'services/redux/types';

const signOut = () => ({
  type: ActionType.SIGN_OUT,
});

const setRememberMe = (check: boolean) => ({
  type: ActionType.REMEMBER_ME_CHECK,
  payload: check,
});

export { signOut, setRememberMe };
