import { REACT_TEXT } from './constants';
import { addEvent } from './event';
function render(vdom,container){
    mount(vdom,container);
}
function  mount(vdom,container){
    if(!vdom)return;
    const dom = createDOM(vdom);
    container.appendChild(dom);
    dom.componentDidMount&&dom.componentDidMount();
}
export function createDOM(vdom){
    let {type,props} = vdom;
    let dom;
    if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
    }else if (typeof type === 'function') {
        if (type.isReactComponent) {//说明这个type是一个类组件的虚拟DOM元素
            return mountClassComponent(vdom);
        } else {
            return mountFunctionComponent(vdom);
        }
    } else{
        dom = document.createElement(type);//span div
    }
    if(props){
        updateProps(dom,{},props);//更新属性
        if(typeof props.children=='object' && props.children.type){
            render(props.children,dom);
        }else if(Array.isArray(props.children)){//是数组的话
            reconcileChildren(props.children,dom);
        }
    }
    vdom.dom=dom;
    return dom;
}
function mountClassComponent(vdom){
    const {type, props} = vdom;
    const classInstance = new type(props);
    vdom.classInstance=classInstance;
    if(classInstance.componentWillMount)
        classInstance.componentWillMount();
    const renderVdom = classInstance.render();
    //classInstance在类组件更新的时候使用，vdom.在获取对应的真实的DOM的时候使用
    classInstance.oldRenderVdom=vdom.oldRenderVdom=renderVdom;
    const dom = createDOM(renderVdom);
    if(classInstance.componentDidMount)
        dom.componentDidMount=classInstance.componentDidMount.bind(classInstance);
    return dom;
}

function mountFunctionComponent(vdom) {
    const {type, props} = vdom;
    const renderVdom = type(props);
    vdom.oldRenderVdom=renderVdom;
    return createDOM(renderVdom);
}
function updateProps(dom,oldProps={},newProps={}){
    for(let key in newProps){
        if(key === 'children'){continue;}
        if(key === 'style'){
            let style = newProps[key];
            for(let attr in style){
                dom.style[attr] = style[attr]
            }
        }else if(key.startsWith('on')){
            addEvent(dom,key.toLocaleLowerCase(),newProps[key]);
        }else{
            dom[key]=newProps[key];
        }
    }
    if (oldProps) {
        for (let key in oldProps) {
            if (!newProps.hasOwnProperty(key)) {
                dom[key]='';
            }
        }
    }
}
function reconcileChildren(childrenVdom,parentDOM){
    childrenVdom.forEach((childVdom)=>render(childVdom,parentDOM));
}
export function findDOM(vdom){
    let {type}= vdom;
    let dom;
    if(typeof type === 'function'){//如果是组件的话
        dom=findDOM(vdom.oldRenderVdom);
    }else{///普通的字符串，那说明它是一个原生组件。dom指向真实DOM
        dom=vdom.dom;
    }
    return dom;
}
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
    //如果老的是null新的也是null
        if (!oldVdom && !newVdom) {
            return;
            //如果老有,新没有,意味着此节点被删除了
            } else if (oldVdom && !newVdom) {
            let currentDOM = findDOM(oldVdom);
            if (currentDOM)
                    parentDOM.removeChild(currentDOM);
            if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
                    oldVdom.classInstance.componentWillUnmount();
                }
            return;
            //如果说老没有,新的有,新建DOM节点
            } else if (!oldVdom && newVdom) {
            let newDOM = createDOM(newVdom);//创建一个新的真实DOM并且挂载到父节点DOM上
            if (nextDOM) {//如果有下一个弟弟DOM的话,插到弟弟前面 p child-counter button
                    parentDOM.insertBefore(newDOM, nextDOM);
                } else {
                    parentDOM.appendChild(newDOM);
                }
            if(newDOM.componentDidMount){
                    newDOM.componentDidMount();
                }
            return;
            //如果类型不同，也不能复用了，也需要把老的替换新的
            } else if (oldVdom && newVdom && (oldVdom.type !== newVdom.type)) {
            let oldDOM = oldVdom.dom;
            let newDOM = createDOM(newVdom);
            oldDOM.parentNode.replaceChild(newDOM, oldDOM);
            if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
                    oldVdom.classInstance.componentWillUnmount();
                }
            if(newDOM.componentDidMount){
                    newDOM.componentDidMount();
                }
            return;
        } else {//新节点和老节点都有值
            deepCompare(oldVdom, newVdom);
            return;
        }
    }
/**
  * 深度比较这二个虚拟DOM
  * @param {*} oldVdom 老的虚拟DOM
  * @param {*} newVdom 新的虚拟DOM
  */
    function deepCompare(oldVdom,newVdom){
        if(oldVdom.type === REACT_TEXT){//文件节点
                let currentDOM = newVdom.dom = oldVdom.dom;//复用老的真实DOM节点
                currentDOM.textContent = newVdom.props.content;//直接修改老的DOM节点的文件就可以了
            }else if(typeof oldVdom.type === 'string'){//说明是个原生组件 div
                let currentDOM = newVdom.dom = oldVdom.dom;//复用老的DIV的真实DOM div#counter
                updateProps(currentDOM,oldVdom.props,newVdom.props);//更新自己的属性
                //更新儿子们 只有原生的组件 div span才会去深度对比
                    updateChildren(currentDOM,oldVdom.props.children,newVdom.props.children);
            }else if(typeof oldVdom.type === 'function'){
                if(oldVdom.type.isReactComponent){
                        updateClassComponent(oldVdom,newVdom);//老的和新的都是类组件，进行类组件更新
                    }else{
                        updateFunctionComponent(oldVdom,newVdom);//老的和新的都是函数组件，进行函数数组更新
                    }
            }
        }
function updateFunctionComponent(oldVdom,newVdom){
    let parentDOM=findDOM(oldVdom).parentNode;//div#counter
    let {type,props}= newVdom;//FunctionCounter {count:2,children:[div]}
    let oldRenderVdom=oldVdom.oldRenderVdom;//老的渲染出来的vdom div#counter-function>0
    let newRenderVdom = type(props);//新的vdom div#counter-function>2
    compareTwoVdom(parentDOM,oldRenderVdom,newRenderVdom);
    newVdom.oldRenderVdom = newRenderVdom;
    }
/**
  * 如果老的虚拟DOM节点和新的虚拟DOM节点都是类组件的话，走这个更新逻辑
  * @param {*} oldVdom 老的虚拟DOM节点
  * @param {*} newVdom 新的虚拟DOM节点
  */
function updateClassComponent(oldVdom,newVdom){
    let classInstance = newVdom.classInstance = oldVdom.classInstance;//类的实例需要复用。类的实例不管更新多少只有一个
    newVdom.oldRenderVdom=oldVdom.oldRenderVdom;//上一次的这个类组件的渲染出来的虚拟DOM
    if(classInstance.componentWillReceiveProps){//组件将要接收到新的属性
            classInstance.componentWillReceiveProps();
        }
    //触发组件的更新，要把新的属性传过来
        classInstance.updater.emitUpdate(newVdom.props);
    }
/**
  * 深度比较它的儿子们
  * @param {*} parentDOM 父DOM点
  * @param {*} oldVChildren 老的儿子们 p2 ChildCounter button
  * @param {*} newVChildren 新的儿子们 p4 null button
  */
function updateChildren(parentDOM,oldVChildren,newVChildren){
    //因为children可能是对象，也可能是数组,为了方便按索引比较，全部格式化为数组
        oldVChildren = Array.isArray(oldVChildren)?oldVChildren:[oldVChildren];
    newVChildren = Array.isArray(newVChildren)?newVChildren:[newVChildren];
    let maxLength = Math.max(oldVChildren.length,newVChildren.length);
    for(let i=0;i<maxLength;i++){
            //在儿子们里查找，找索引是大于当前索引的
                let nextDOM = oldVChildren.find((item,index)=>index>i&&item&&item.dom);
            compareTwoVdom(parentDOM,oldVChildren[i],newVChildren[i],nextDOM&&nextDOM.dom);
        }
    }
const ReactDOM =  {
    render
};
export default ReactDOM;
