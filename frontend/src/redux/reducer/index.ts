import { combineReducers } from "redux";
import reducer from "./authReducer";
import homePageReducer from "./homePageReducer";
const reducers = combineReducers({
  authReducer: reducer,
  homePageReducer,
});

export default reducers;
