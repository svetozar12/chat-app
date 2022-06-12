import { combineReducers } from "redux";
import reducer from "./authReducer/authReducer";
import setReducer from "./setReducer/setReducer";
import saveInputReducer from "./save_inputReducer/save_inputReducer";
import messageReducer from "./messageReducer/messageReducer";
import { ActionType } from "../types";
const combiReducers = combineReducers({
  authReducer: reducer,
  setReducer,
  messageReducer,
  saveInputReducer,
});

const combReducers = (state: any, action: any) => {
  if (action.type === ActionType.SIGN_OUT) {
    return undefined;
  }
  return combiReducers(state, action);
};

export default combReducers;
