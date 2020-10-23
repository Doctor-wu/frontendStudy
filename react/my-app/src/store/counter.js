import { createStore } from "redux";

function counterReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;

    case "MINUS":
      return state - 1;

    default:
      return state;
  }
}

export const counterStore = createStore(counterReducer);
