import React, { Component } from "react";

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
      </div>
    );
  }
}


export default ClassComponent;
