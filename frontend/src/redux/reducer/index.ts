import { combineReducers } from "redux";
import reducer from "./usersReducer";
const reducers = combineReducers({
  userState: reducer,
});

export default reducers;
