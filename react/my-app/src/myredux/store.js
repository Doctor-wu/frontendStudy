import { createStore, combineReducers, applyMiddleware } from "./myredux";
import { thunk, logger } from "./middleware";
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

// 中间件都是在dispatch执行的时候起作用的
// 原理就是把用户调用的dispatch变成中间件的某个方法
// 这个方法就可以做中间件想做的事然后再执行原生的dispatch
let store = createStore(rootReducer, applyMiddleware(logger, thunk));
// dispatch getState subscribe

export default store;
