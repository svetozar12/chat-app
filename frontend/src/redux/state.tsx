export enum ActionType {
  LOGIN_POST = "LOGIN_POST",
  LOGIN_POST_ERROR = "LOGIN_POST_ERROR",
  REGISTER_POST = "REGISTER_POST",
  REGISTER_POST_ERROR = "REGISTER_POST_ERROR",
  SAVE_INPUT = "SAVE_INPUT",
  REMEMBER_ME_CHECK = "REMEMBER_ME_CHECK",
  QUICK_LOGIN = "QUICK_LOGIN",
  SIGN_IN = "SIGN_IN",
  SET_RECIEVER = "SET_RECIEVER",
  INCREMENT_PAGE_NUMBER = "INCREMENT_PAGE_NUMBER",
  MESSAGE_SEND = "MESSAGE_SEND",
}

interface LoginPost {
  type: ActionType.LOGIN_POST | ActionType.REGISTER_POST;
  payload?: string;
  good?: string;
}

interface errLoginPost {
  type: ActionType.LOGIN_POST_ERROR | ActionType.REGISTER_POST_ERROR;
  payload?: string;
  bad?: string;
}

interface inputs {
  type: ActionType.SAVE_INPUT | ActionType.REMEMBER_ME_CHECK;
  payload: string;
}

interface signIn {
  type: ActionType.QUICK_LOGIN | ActionType.SIGN_IN;
  payload: string;
}

interface Iset {
  type: ActionType.SET_RECIEVER | ActionType.INCREMENT_PAGE_NUMBER;
  payload: number;
}

interface IMessages {
  type: ActionType.MESSAGE_SEND;
  payload: { sender: string; message: string };
}

export type Action =
  | LoginPost
  | errLoginPost
  | inputs
  | signIn
  | Iset
  | IMessages;

export interface InitialState {
  remember_me: boolean;
  input: string;
  loginPrompt: boolean;
  good?: string;
  bad?: string;
  cookie?: string;
}

export interface InitialState2 {
  reciever: string;
  pageNumber?: number;
}

export interface InitialStateMessage {
  payload: { sender: string; message: string };
}
