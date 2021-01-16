import {updateQueue} from "./Component";

export function addEvent(dom, eventType, listener){
    let store = dom.store || (dom.store = {});
    store[eventType] = listener;
    if(!document[eventType]){
        document[eventType] = dispatchEvent;
    }
}

let syntheticEvent = {
    stopping: false,
    stop(){
        this.stopping = true; // 阻止冒泡
    }
};
function dispatchEvent(nativeEvent){
    let {target, type} = nativeEvent;// 事件源target，事件类型type
    let eventType = `on${type}`;// onclick
    updateQueue.isBatchingUpdate = true;// 把队列设置为批量更新
    createSyntheticEvent(nativeEvent);
    while (target){ // 模拟事件冒泡
        if(syntheticEvent.stopping) break;
        let {store} = target;
        let listener = store&&store[eventType];
        listener&&listener.call(target, syntheticEvent); // 执行事件
        target = target.parentNode;
    }
    syntheticEvent.stopping = false;
    for (let key in nativeEvent){
        delete syntheticEvent[key];
    }
    updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent){
    for (const nativeEventKey in nativeEvent) {
        syntheticEvent[nativeEventKey] = nativeEvent[nativeEventKey];
    }
}
