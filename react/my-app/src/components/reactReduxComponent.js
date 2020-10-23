import React, { Component } from "react";
import { connect } from "react-redux";

export default connect(
  // mapStateToProps
  (state) => ({
    num: state,
  }),
  // mapDispatchToProps

  {
    add: () => ({ type: "ADD" }),
    minus: () => ({ type: "MINUS" }),
  }
)(
  class ReactReduxComponent extends Component {
    render() {
      console.log(this.props);
      return (
        <div>
          <strong>React-redux Component</strong>
          <br />
          <br />
          <em>counter: {this.props.num}</em>
          <br />
          <button onClick={this.props.add}>ADD</button>
          <br />
          <button onClick={this.props.minus}>MINUS</button>
        </div>
      );
    }
  }
);
