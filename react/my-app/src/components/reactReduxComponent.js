import React, { Component } from "react";
import { connect } from "react-redux";

export default connect(
  // mapStateToProps
  (state) => ({
    num: state,
  }),
  // mapDispatchToProps
  (dispatch) => ({ dispatch })
  //   {
  //     add: () => ({ type: "ADD" }),
  //     minus: () => ({ type: "MINUS" }),
  //   }
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
          <button
            onClick={() => {
              this.props.dispatch((dispatch, getState) => {
                  console.log(getState());
                setTimeout(() => {
                  dispatch({ type: "ADD" });
                }, 2000);
              });
            }}
          >
            ADD
          </button>
          <br />
          <button onClick={this.props.minus}>MINUS</button>
        </div>
      );
    }
  }
);
