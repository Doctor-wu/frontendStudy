import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import findReducer, { IFindState } from "./reducers/findReducers";

export interface IState {
  find: IFindState;
}

let rootReducer = combineReducers<IState>({
  find: findReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
