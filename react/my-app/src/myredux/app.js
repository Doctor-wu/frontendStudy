import React, { Component } from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider, connect } from "./my-react-redux";

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
  add = (dispatch, getState) => {
    setTimeout(() => {
      dispatch({ type: "add", num: getState().countReducer.count });
    }, 500);
  };
  render() {
    console.log("render", this.props);
    return (
      <>
        <h2 style={{ color: this.props.colorReducer.color }}>
          {this.props.countReducer.count}
        </h2>
        <button
          onClick={() => {
            store.dispatch(this.add);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            store.dispatch((dispatch, getState) => {
              dispatch({ type: "changeColor", color: "blue" });
            });
          }}
        >
          Change Blue
        </button>
      </>
    );
  }
}

App = connect(
  (state) => state,
  (dispatch) => ({ dispatch })
)(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

export default App;
