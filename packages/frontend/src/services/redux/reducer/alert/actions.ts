import { ActionType } from 'services/redux/types';

const setLoginError = (message: string) => ({
  type: ActionType.LOGIN_POST_ERROR,
  payload: message,
});

const setRegisterSuccess = (message: string) => ({
  type: ActionType.REGISTER_POST,
  payload: message,
});

const setRegisterError = (message: string) => ({
  type: ActionType.REGISTER_POST_ERROR,
  payload: message,
});

export { setLoginError, setRegisterError, setRegisterSuccess };
