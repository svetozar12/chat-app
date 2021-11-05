import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducer";
export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
);

export * as actions from "./actions";
