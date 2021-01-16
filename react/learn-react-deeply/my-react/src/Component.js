import {createDOM} from "./react-dom";

export let updateQueue = {
    isBatchingUpdate: false,
    updaters: new Set(),
    batchUpdate(){
        for (const updater of this.updaters) {
            updater.updateClassComponent();
        }
    }
}

class Updater{
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingStates = [];
        this.callbacks = [];
    }
    addState(partialState, callback){
        this.pendingStates.push(partialState);
        if(typeof callback === "function")
            this.callbacks.push(callback); // 状态更新后的回调
        this.emitUpdate();
    }
    emitUpdate(newProps){
        if(updateQueue.isBatchingUpdate){ // 如果当前处于批量更新模式，则先把updater缓存起来
            updateQueue.updaters.add(this); // 本次setState调用结束
        }else{
            this.updateClassComponent();
        }
    }
    updateClassComponent(){
        let {classInstance} = this;
        shouldUpdate(classInstance, this.getState());
    }
    getState(){
        let {classInstance, pendingStates} = this;
        let {state} = classInstance;
        pendingStates.forEach(newState=>{
            if(typeof newState === "function"){
                newState = newState(state);
            }
            state = {...state, ...newState};
        });
        pendingStates.length = 0;
        return state;
    }
}
class Component{
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.updater = new Updater(this);
    }
    render(){
        throw new Error("此方法为抽象方法，需要子类实现");
    }
    setState(partialState, callback){
        this.updater.addState(partialState, callback);
    }
    forceUpdate(){
        if(this.componentWillUpdate)
            this.componentWillUpdate();
        let newVDom = this.render();
        updateClassComponent(this, newVDom);
        if(this.componentDidUpdate)
            this.componentDidUpdate();
    }
}

function shouldUpdate(classInstance, nextState){
    classInstance.state = nextState; // 无论渲染与否，状态一定会更新
    if(classInstance.shouldComponentUpdate// 如果有classInstance.shouldComponentUpdate且返回false，则不重新渲染组件
        &&!classInstance.shouldComponentUpdate(classInstance.props, classInstance.state)){
        return;
    }
    classInstance.forceUpdate();
}

function updateClassComponent(classInstance, newVDom){
    let oldDOM = classInstance.dom;
    let newDOM = createDOM(newVDom);
    oldDOM.parentNode.replaceChild(newDOM,oldDOM);
    classInstance.dom = newDOM;
}

export default Component;
