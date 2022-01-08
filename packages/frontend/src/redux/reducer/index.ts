import { combineReducers } from "redux";
import reducer from "./authReducer";
import setReducer from "./setReducer";
import saveInputReducer from "./save_inputReducer";
import messageReducer from "./messageReducer";

const reducers = combineReducers({
  authReducer: reducer,
  setReducer,
  messageReducer,
  saveInputReducer,
});

export default reducers;
