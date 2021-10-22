import { ActionType } from "../action-types/index";

interface LoginPost {
  type: ActionType.LOGIN_POST | ActionType.LOGIN_POST_ERROR;
  payload?: string;
}

type Action = LoginPost;

export default Action;
