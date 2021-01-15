import {createDOM} from "./react-dom";

class Component{
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
    }
    render(){
        throw new Error("此方法为抽象方法，需要子类实现");
    }
    setState(partialState){
        let state = this.state;
        this.state = {...state, ...partialState};
        let newVDom = this.render();
        updateClassComponent(this, newVDom);
    }
}

function updateClassComponent(classInstance, newVDom){
    let oldDOM = classInstance.dom;
    let newDOM = createDOM(newVDom);
    oldDOM.parentNode.replaceChild(newDOM,oldDOM);
    classInstance.dom = newDOM;
}

export default Component;
