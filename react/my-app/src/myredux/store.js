import { createStore } from "./myredux";

function reducer(state, action) {
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

let store = createStore(reducer);
// dispatch getState subscribe

export default store;
