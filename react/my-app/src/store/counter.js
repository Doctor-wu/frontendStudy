import { createStore } from "redux";

function counterReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
      break;

    case "MINUS":
      return state - 1;
      break;

    default:
      return state;
      break;
  }
}

export const counterStore = createStore(counterReducer);
