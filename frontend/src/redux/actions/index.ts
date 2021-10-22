import { ActionType } from "../action-types/index";

interface Test {
  type: ActionType.TEST;
  payload: number;
}

interface Test1 {
  type: ActionType.TEST1;
  payload: number;
}

type Action = Test | Test1;

export default Action;
