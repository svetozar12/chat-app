import { combineReducers } from "redux";
import reducer from "./authReducer";
const reducers = combineReducers({
  authReducer: reducer,
});

export default reducers;
