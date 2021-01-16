/**
 * 1. 把vdom虚拟DOM变成真实DOM
 * 2. 把props上的属性更新或者说是同步到DOM上
 * 3. 把虚拟DOM的儿子们也变成真实DOM并挂载到自己的dom上
 * 4. 把自己挂载到容器上
 * @param vdom 虚拟DOM
 * @param container 虚拟DOM被插入的容器
 */
import {addEvent} from "./event";

function render(vdom, container) {
    let dom = createDOM(vdom);
    container.appendChild(dom);
}

export function createDOM(vdom) {
    if (typeof vdom === "string" || typeof vdom === "number") {
        return document.createTextNode(vdom);
    }

    let {type, props} = vdom;

    if(typeof vdom.type === "function"){
        if(type.isReactComponent){
            // 是类组件
            return mountClassComponent(vdom);
        }else{
            // 是函数组件
            return mountFunctionComponent(vdom);
        }
    }
    let dom = document.createElement(type);
    updateProps(props, dom);

    // 处理children
    if(typeof props.children === "string" || typeof props.children === "number"){
        dom.textContent = props.children;
    }else if(typeof props.children === "object" && props.children.type){
        render(props.children, dom);
    }else if(Array.isArray(props.children)){
        reconcileChildren(props.children, dom);
    }else{
        dom.textContent = dom.toString?dom.toString():"";
    }

    return dom;
}

function mountFunctionComponent(vdom){
    let {type:functionalComponent, props} = vdom;
    let functionalVdom = functionalComponent(props);
    return createDOM(functionalVdom);
}

function mountClassComponent(vdom) {
    // 解构类的属性对象和类的定义
    let {type, props} = vdom;
    // 创建类的实例
    let classInstance = new type(props);
    // 调用实例的render方法返回要渲染的vdom对象
    let renderVDOM = classInstance.render();
    // 根据虚拟DOM创建真实DOM
    let dom = createDOM(renderVDOM);
    // 为了以后类组件的更新，把真实DOM挂在类实例上
    classInstance.dom = dom;

    return dom;
}

function updateProps(props, dom) {
    for (const key in props) {
        if (key === "children") continue; // children放在后面处理
        if (key === "style") {
            for (const styleKey in props.style) {
                dom.style[styleKey] = props.style[styleKey];
            }
            continue;
        }else if(key.startsWith("on")){
            // dom[key.toLocaleLowerCase()] = props[key]; // 暂时先用DOM0级事件处理
            addEvent(dom,key.toLocaleLowerCase(),props[key]);
        }
        dom[key] = props[key];
    }
}

function reconcileChildren(childrenVDOM, parentDOM) {
    for (let i =0;i<childrenVDOM.length;i++){
        render(childrenVDOM[i], parentDOM);
    }
}

const React = {render};
export default React;
