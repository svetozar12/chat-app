import { combineReducers } from "redux";
import reducer from "./usersReducer";
const reducers = combineReducers({
  userState: reducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
