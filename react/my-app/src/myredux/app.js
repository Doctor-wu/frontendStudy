import React, { Component } from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider, connect } from "react-redux";

class App extends Component {
//   componentDidMount() {
//     this.disScribe = store.subscribe(() => {
//       this.setState({});
//     });
//   }
//   componentWillUnmount() {
//     // 在组件销毁时，把该组件的订阅函数从事件池中移除
//     this.disScribe();
//   }
  render() {
    console.log("render", this.props);
    return (
      <>
        <h2>{store.getState().count}</h2>
        <button
          onClick={() => {
            store.dispatch({ type: "add", num: 10 });
          }}
        >
          +
        </button>
      </>
    );
  }
}

App = connect(
  (state) => ({ count: state.count }),
  (dispatch) => ({ dispatch })
)(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

export default App;
