import { createStore, applyMiddleware } from "redux";
import { createWrapper, Context } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducer";

const makeStore = (context: Context) => createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, { debug: true });
export * as actions from "./actions/authActions";
