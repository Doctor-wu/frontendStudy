import React, { Component } from "react";

const foo = (Cmp) => (props) => {
  return (
    <div style={{ border: "1px solid red", margin: "10px" }}>
      <Cmp {...props} />
    </div>
  );
};

class Child extends Component {
  render() {
    return <div>child</div>;
  }
}

@foo
@foo
@foo
@foo
class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  // 组件挂载后执行的钩子
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }

  // 组件销毁前执行的钩子
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <strong>Class Component</strong>
        <br />
        {date.toLocaleTimeString()}
        <Child />
      </div>
    );
  }
}

export default ClassComponent;
