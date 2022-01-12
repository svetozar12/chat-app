import { combineReducers } from "redux";
import reducer from "./authReducer";
import setReducer from "./setReducer";
import saveInputReducer from "./save_inputReducer";
import messageReducer from "./messageReducer";
import { ActionType } from "../state";
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
