import React, { Component } from "react";
import { counterStore } from "../store/counter";

class ReduxComponent extends Component {
  componentDidMount() {
    counterStore.subscribe(() => {
      this.forceUpdate();
    });
  }
  render() {
    return (
      <div>
        <hr />
        <strong>Redux Component</strong>
        <br />
        <br />
        <em>counter: {counterStore.getState()}</em>
        <br />
        <button onClick={() => counterStore.dispatch({ type: "ADD" })}>
          ADD
        </button><br/>
        <button onClick={() => counterStore.dispatch({ type: "MINUS" })}>
          MINUS
        </button>
      </div>
    );
  }
}

export default ReduxComponent;
