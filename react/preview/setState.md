## setState

**State 的更新可能是异步的**

**出于性能考虑,React 可能会把多个 setState() 调用用合并成一个调用。**
**观察以下例例子中log的值和button显示的counter。**

```react
import React, { Component } from "react";
export default class SetStatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  changeValue = (v) => {
    this.setState({
      counter: this.state.counter + v,
    });
    console.log("counter", this.state.counter);
  };
  setCounter = () => {
    this.changeValue(1);
    //this.changeValue(2);
    //console.log("counter", this.state.counter);
  };
  render() {
    const { counter } = this.state;
    return (
      <div>
        <h3>SetStatePage</h3>
        <button onClick={this.setCounter}>{counter}</button>
      </div>
    );
  }
}

```

**如果要获取到最新状态值有以下方方式:**

1. **在回调中获取状态值**

  ```react
  changeValue = (v) => {
    this.setState(
      {
        counter: this.state.counter + v,
      },
      () => {
        console.log("counter", this.state.counter);
      }
    );
  };
  ```

  

2. **使用用定时器器:**

  ```react
  setTimeout(() => {
    this.setCounter();
  }, 0);
  ```

  

3. **原生生事件中修改状态**

  ```react
  componentDidMount(){
      document.body.addEventListener('click',
      this.changeValue, false)
      }
  ```

  **总结: setState只有在合成事件和生生命周期函数中是异步的,在原生生事件和setTimeout中都是同步**
  **的,这里里里的异步其实是批量量更更新。**



**State 的更更新会被合并**

```react
changeValue = (v) => {
  this.setState({
    counter: this.state.counter + v,
  });
};
setCounter = () => {
  this.changeValue(1);
  this.changeValue(2);
};
```

**如果想要链式更更新state:**

```react
changeValue = (v) => {
  this.setState((state) => ({ counter: state.counter + v }));
};
setCounter = () => {
  this.changeValue(1);
  this.changeValue(2);
};
```

