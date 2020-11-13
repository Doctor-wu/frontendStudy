export function thunk(store) {
  return function (dispatch) {
    return function midDispatch(action) {
      if (typeof action === "function") {
        return action(dispatch, store.getState);
      }

      return dispatch(action);
    };
  };
}

export const logger = (store) => (dispatch) => (action) => {
  console.log("老值是: ", store.getState());
  dispatch(action);
  console.log("新值是: ", store.getState());
};
