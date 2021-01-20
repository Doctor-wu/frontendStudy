import {createDOM,findDOM,compareTwoVdom} from './react-dom';
import {isFunction} from './utils';
export let updateQueue = {
    isBatchingUpdate: false,
    updaters: new Set(),
    add(updater){
        updateQueue.updaters.add(updater);
    },
    batchUpdate() {
        updateQueue.isBatchingUpdate = false;
        for(let updater of updateQueue.updaters){
            updater.emitUpdate();
        }
        updateQueue.updaters.clear();
    }
};
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingStates = [];
    }
    addState(partialState) {
        this.pendingStates.push(partialState);
        updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.emitUpdate();
    }
    emitUpdate(nextProps){
        let { classInstance, pendingStates } = this;
        if (nextProps || pendingStates.length > 0) {
            shouldUpdate(classInstance,nextProps,this.getState());
        }
    }
    getState() {
        let { classInstance, pendingStates } = this;
        let { state } = classInstance;
        if (pendingStates.length) {
            pendingStates.forEach(nextState => {
                if (isFunction(nextState)) {
                    nextState = nextState.call(classInstance, state);
                }
                state = { ...state, ...nextState };
            });
            pendingStates.length = 0;
        }
        return state;
    }
}
function shouldUpdate(classInstance,nextProps,nextState){
    let willUpdate = true;
    if(classInstance.shouldComponentUpdate
        &&!classInstance.shouldComponentUpdate(nextProps,nextState)){
        willUpdate = false;
    }
    if(willUpdate && classInstance.componentWillUpdate){
        classInstance.componentWillUpdate();
    }
    if(nextProps){
        classInstance.props = nextProps;
    }
    classInstance.state = nextState;
    if(willUpdate)
        classInstance.updateComponent();
}
class Component{
    static isReactComponent=true
    constructor(props){
        this.props = props;
        this.state = {};
        this.updater = new Updater(this);
    }
    setState(partialState) {
        this.updater.addState(partialState);
    }
    updateComponent(){
        let newRenderVdom= this.render();
        let oldDOM = findDOM(this.oldRenderVdom);
        compareTwoVdom(oldDOM.parentNode,this.oldRenderVdom,newRenderVdom);
        this.oldRenderVdom=newRenderVdom;
        if(this.componentDidUpdate)
            this.componentDidUpdate(this.props,this.state);
    }
}
export default Component;
