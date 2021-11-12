import { combineReducers } from "redux";
import reducer from "./authReducer";
import homePageReducer from "./homePageReducer";
import messageReducer from "./messageReducer";

const reducers = combineReducers({
  authReducer: reducer,
  homePageReducer,
  messageReducer,
});

export default reducers;
