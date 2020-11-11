export default function thunk(store) {
  return function (dispatch) {
    return function midDispatch(action) {
      if (typeof action === "function") {
        return action(dispatch, store.getState);
      }

      return dispatch(action);
    };
  };
}
