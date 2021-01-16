import React from "react";
import ReactDOM from "react-dom";


class ChildCounter extends React.Component{

    constructor(props) {
        super(props);
        console.log(`ChildCounter 1. constructor 初始化属性和状态对象`);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`ChildCounter 0. componentWillMount 组件即将收到新的Props`);
    }

    componentWillMount() {
        console.log(`ChildCounter 2. componentWillMount 组件即将挂载`);
    }

    componentWillUnmount() {
        console.log(`ChildCounter 8. componentWillMount 组件即将销毁`);
    }

    componentDidMount() {
        console.log(`ChildCounter 4. componentDidMount 组件挂载完成`);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(`ChildCounter 5. shouldComponentUpdate 决定组件是否更新`);
        return nextProps.count%3 === 0;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log(`ChildCounter 6. componentWillUpdate 组件即将更新`);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`ChildCounter 7. componentDidUpdate 组件更新完成`);
    }

    render() {
        console.log(`ChildCounter 3. render 重新计算得到新的虚拟DOM`);
        return (
            <div>child: {this.props.count}</div>
        )
    }
}

class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {count: 0};
        console.log(`Counter 1. constructor 初始化属性和状态对象`);
    }

    handleClick = ()=>{
        this.setState({
            count: this.state.count + 1
        })
    }

    componentWillMount() {
        console.log(`Counter 2. componentWillMount 组件即将挂载`);
    }

    componentDidMount() {
        console.log(`Counter 4. componentDidMount 组件挂载完成`);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(`Counter 5. shouldComponentUpdate 决定组件是否更新`);
        return nextState.count%2 === 0;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log(`Counter 6. componentWillUpdate 组件即将更新`);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`Counter 7. componentDidUpdate 组件更新完成`);
    }


    render() {
        console.log(`Counter 3. render 重新计算得到新的虚拟DOM`);
        return (
            <>
                <div>{this.state.count}</div>
                <div>{this.state.count===4?null:<ChildCounter count={this.state.count}/>}</div>
                <button onClick={this.handleClick}>加一</button>
            </>
        )
    }
}



ReactDOM.render((
    <Counter name="Doctorwu" />
), document.getElementById("root"));

