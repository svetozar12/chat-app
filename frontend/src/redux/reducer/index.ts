import { combineReducers } from "redux";
import reducer from "./testReducer";
const reducers = combineReducers({
  testRedux: reducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
