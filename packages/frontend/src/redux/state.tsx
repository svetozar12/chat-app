/* eslint-disable no-unused-vars */
import { HYDRATE } from "next-redux-wrapper";
import { IchatInstance } from "../components/ChatRoom/ChatRoom";

export enum ActionType {
  LOGIN_POST = "LOGIN_POST",
  LOGIN_POST_ERROR = "LOGIN_POST_ERROR",
  REGISTER_POST = "REGISTER_POST",
  REGISTER_POST_ERROR = "REGISTER_POST_ERROR",
  SAVE_INPUT_USERNAME = "SAVE_INPUT_USERNAME",
  SAVE_INPUT_PASSWORD = "SAVE_INPUT_PASSWORD",
  SAVE_INPUT_EMAIL = "SAVE_INPUT_EMAIL",
  SAVE_INPUT_GENDER = "SAVE_INPUT_GENDER",
  INCREMENT_PAGE_NUMBER = "INCREMENT_PAGE_NUMBER",
  CHAT_INVITER = "CHAT_INVITER",
  REMEMBER_ME_CHECK = "REMEMBER_ME_CHECK",
  QUICK_LOGIN = "QUICK_LOGIN",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  TOGGLE_CREATE_GROUP = "TOGGLE_CREATE_GROUP",
  SET_RECIEVER = "SET_RECIEVER",
  SET_FRIEND_REQUEST = "SET_FRIEND_REQUEST",
  SET_USER_SETTINGS = "SET_USER_SETTINGS",
  SET_MOBILE_NAV = "SET_MOBILE_NAV",
  SET_IS_MATCH = "SET_IS_MATCH",
  SET_CHAT_SETTINGS = "SET_CHAT_SETTINGS",
  SET_MODAL_INVITE = "SET_MODAL_INVITE",
  NOTIFICATION_NUMBER = "NOTIFICATION_NUMBER",
  SET_IS_LOGEDIN = "SET_IS_LOGEDIN",
  MESSAGES = "MESSAGES",
  CLEAR = "CLEAR",
  DELETE_MESSAGE = "DELETE_MESSAGE",
  RESET_MESSAGES = "RESET_MESSAGES",
  PAGGINATION_MESSAGES = "PAGGINATION_MESSAGES",
  SHOW_SETTINGS = "SHOW_SETTINGS",
}

interface MESSAGES {
  type: ActionType.MESSAGES | ActionType.DELETE_MESSAGE | ActionType.PAGGINATION_MESSAGES;
  payload: string[];
}

interface CLEAR {
  type: ActionType.CLEAR;
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
    | ActionType.SAVE_INPUT_EMAIL
    | ActionType.SAVE_INPUT_GENDER
    | ActionType.REMEMBER_ME_CHECK
    | ActionType.CHAT_INVITER;
  payload: string;
}

interface signIn {
  type: ActionType.QUICK_LOGIN | ActionType.SIGN_IN;
  payload: string;
}

interface signOut {
  type: ActionType.SIGN_OUT | ActionType.RESET_MESSAGES;
}

interface Iset {
  type: ActionType.SET_RECIEVER | ActionType.INCREMENT_PAGE_NUMBER | ActionType.NOTIFICATION_NUMBER;
  payload: number;
}

interface Hydrate {
  type: typeof HYDRATE;
  payload: any;
}

interface toggle_create_group {
  type:
    | ActionType.TOGGLE_CREATE_GROUP
    | ActionType.SET_USER_SETTINGS
    | ActionType.SET_FRIEND_REQUEST
    | ActionType.SET_MOBILE_NAV
    | ActionType.SET_IS_MATCH
    | ActionType.SET_CHAT_SETTINGS
    | ActionType.SET_MODAL_INVITE
    | ActionType.SET_IS_LOGEDIN
    | ActionType.SHOW_SETTINGS;
  payload: boolean | string[] | string;
}

export type Action = LoginPost | CLEAR | MESSAGES | errLoginPost | inputs | signIn | signOut | Iset | Hydrate | toggle_create_group;

export interface InitialState {
  remember_me: boolean;
  loginPrompt: boolean;
  good?: string;
  bad?: string;
  cookie?: string;
}

export interface InitialState2 {
  reciever: string;
  chat_inviter: string;
  pageNumber?: number;
  setUserSettings: boolean;
  setFriendRequest: boolean;
  setModalInvite: boolean;
  toggleCreateGroup: boolean;
  setMobileNav: boolean;
  setIsMatch: boolean;
  setChatSettings: boolean;
  setIsLoggingIn: boolean;
}

export interface InitialState3 {
  input_username: string;
  input_password: string;
  input_email: string;
  input_gender: string;
  notification_number: number;
}

export interface InitialStateMessage {
  messages: IchatInstance[];
  show: boolean;
}
