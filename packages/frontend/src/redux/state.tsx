import { HYDRATE } from "next-redux-wrapper";

export enum ActionType {
  LOGIN_POST = "LOGIN_POST",
  LOGIN_POST_ERROR = "LOGIN_POST_ERROR",
  REGISTER_POST = "REGISTER_POST",
  REGISTER_POST_ERROR = "REGISTER_POST_ERROR",
  SAVE_INPUT_USERNAME = "SAVE_INPUT_USERNAME",
  SAVE_INPUT_PASSWORD = "SAVE_INPUT_PASSWORD",
  REMEMBER_ME_CHECK = "REMEMBER_ME_CHECK",
  QUICK_LOGIN = "QUICK_LOGIN",
  SIGN_IN = "SIGN_IN",
  SET_RECIEVER = "SET_RECIEVER",
  INCREMENT_PAGE_NUMBER = "INCREMENT_PAGE_NUMBER",
  MESSAGE_SEND = "MESSAGE_SEND",
  SIGN_OUT = "SIGN_OUT",
  TOGGLE_CREATE_GROUP = "TOGGLE_CREATE_GROUP",
  SET_FRIEND_REQUEST = "SET_FRIEND_REQUEST",
  SET_USER_SETTINGS = "SET_USER_SETTINGS",
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
  type:
    | ActionType.SAVE_INPUT_USERNAME
    | ActionType.SAVE_INPUT_PASSWORD
    | ActionType.REMEMBER_ME_CHECK;
  payload: string;
}

interface signIn {
  type: ActionType.QUICK_LOGIN | ActionType.SIGN_IN;
  payload: string;
}

interface signOut {
  type: ActionType.SIGN_OUT;
}

interface Iset {
  type: ActionType.SET_RECIEVER | ActionType.INCREMENT_PAGE_NUMBER;
  payload: number;
}

interface IMessages {
  type: ActionType.MESSAGE_SEND;
  payload: { sender: string; message: string };
}

interface Hydrate {
  type: typeof HYDRATE;
  payload: any;
}

interface toggle_create_group {
  type:
    | ActionType.TOGGLE_CREATE_GROUP
    | ActionType.SET_USER_SETTINGS
    | ActionType.SET_FRIEND_REQUEST;
  payload: boolean;
}

export type Action =
  | LoginPost
  | errLoginPost
  | inputs
  | signIn
  | signOut
  | Iset
  | IMessages
  | Hydrate
  | toggle_create_group;

export interface InitialState {
  remember_me: boolean;
  input_username: string;
  input_password: string;
  loginPrompt: boolean;
  good?: string;
  bad?: string;
  cookie?: string;
}

export interface InitialState2 {
  reciever: string;
  pageNumber?: number;
  setUserSettings: boolean;
  setFriendRequest: boolean;
  toggleCreateGroup: boolean;
}

export interface InitialStateMessage {
  payload: { sender: string; message: string };
}
