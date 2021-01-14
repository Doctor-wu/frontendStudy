import React from "./react";
import ReactDOM from "./react-dom";

function FunctionComponent(props){
    return (
        <div className="title" style={{color: "lightseagreen"}}>
            <h2>{props.children}</h2>
            <h2>{props.name}</h2>
        </div>
    )
}



ReactDOM.render((
    <FunctionComponent name={"doctorwu"}>
        <span>hello</span>
    </FunctionComponent>
), document.getElementById("root"));

