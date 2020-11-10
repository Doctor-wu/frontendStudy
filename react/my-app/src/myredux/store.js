import { createStore, combineReducers } from "./myredux";

function count(state, action) {
  state = state || {
    count: 100,
  };

  switch (action.type) {
    case "add":
      return {
        count: state.count + action.num,
      };
    case "minus":
      return {
        count: state.count - action.num,
      };

    default:
      return {
        ...state,
      };
  }
}

function color(state, action) {
  state = state || {
    color: "red",
  };
  switch (action.type) {
    case "changeColor":
      return {
        color: action.color,
      };

    default:
      return {
        ...state,
      };
  }
}

let rootReducer = combineReducers({
  countReducer: count,
  colorReducer: color,
});

let store = createStore(rootReducer);
// dispatch getState subscribe

export default store;
