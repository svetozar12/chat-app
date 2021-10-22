import { combineReducers } from "redux";
import reducer from "./testReducer";
const reducers = combineReducers({
  usersState: reducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
