import React from "react";
import myContext from "./my-context";

class Provider extends React.Component {
  render() {
    let { children, store } = this.props;
    return (
      <myContext.Provider value={{ store }}>{children}</myContext.Provider>
    );
  }
}

function connect(mapStateToProps, mapDispatchToProps) {
  return function (Com) {
    return class Temp extends React.Component {
      static contextType = myContext;
      constructor(props, context) {
        super(props, context);
        console.log(props, context);
        this.state = mapStateToProps(context.store.getState());
      }
      componentDidMount() {
        this.cancelSubscribe = this.context.store.subscribe(() => {
          this.setState(mapStateToProps(this.context.store.getState()));
        });
      }
      componentWillUnmount() {
        this.cancelSubscribe();
      }
      render() {
        return (
          <Com
            {...this.props}
            {...this.state}
            {...mapDispatchToProps(this.context.store.dispatch)}
          />
        );
      }
    };
  };
}

export { Provider, connect };
