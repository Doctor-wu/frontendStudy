import React from "react";
import ReactDOM from "react-dom";


class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {count: 0};
        console.log(`1. constructor 初始化属性和状态对象`);
    }

    handleClick = ()=>{
        this.setState({
            count: this.state.count + 1
        })
    }

    componentWillMount() {
        console.log(`2. componentWillMount 组件即将挂载`);
    }

    componentDidMount() {
        console.log(`4. componentDidMount 组件挂载完成`);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(`5. shouldComponentUpdate 决定组件是否更新`);
        return nextState.count%2 === 0;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log(`6. componentWillUpdate 组件即将更新`);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`7. componentDidUpdate 组件更新完成`);
    }


    render() {
        console.log(`3. render 重新计算得到新的虚拟DOM`);
        return (
            <>
                <div>{this.state.count}</div>
                <button onClick={this.handleClick}>加一</button>
            </>
        )
    }
}



ReactDOM.render((
    <Counter name="Doctorwu" />
), document.getElementById("root"));

