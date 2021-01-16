import React from "./react";
import ReactDOM from "./react-dom";
import {updateQueue} from "./Component";

// function FunctionComponent(props){
//     return (
//         <div className="title" style={{color: "lightseagreen"}}>
//             <h2>{props.children}</h2>
//             <h2>{props.name}</h2>
//         </div>
//     )
// }

class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {count: 0, name: this.props.name};
    }

    handleClick = ()=>{
        updateQueue.isBatchingUpdate = true;
        this.setState({
            count: this.state.count + 1
        },(newState)=>{
            console.log(newState);
        });

        this.setState({
            count: this.state.count + 1
        },(newState)=>{
            console.log(newState);
        });

        updateQueue.batchUpdate();
    }

    render() {
        return (
            <>
                <h2>{this.state.name}</h2>
                <div>{this.state.count}</div>
                <button onClick={this.handleClick}>加一</button>
            </>
        )
    }
}



ReactDOM.render((
    <Counter name="Doctorwu" />
), document.getElementById("root"));

