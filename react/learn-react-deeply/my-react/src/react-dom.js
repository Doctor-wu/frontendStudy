/**
 * 1. 把vdom虚拟DOM变成真实DOM
 * 2. 把props上的属性更新或者说是同步到DOM上
 * 3. 把虚拟DOM的儿子们也变成真实DOM并挂载到自己的dom上
 * 4. 把自己挂载到容器上
 * @param vdom 虚拟DOM
 * @param container 虚拟DOM被插入的容器
 */
function render(vdom, container) {
    let dom = createDOM(vdom);
    container.appendChild(dom);
}

function createDOM(vdom) {
    if (typeof vdom === "string" || typeof vdom === "number") {
        return document.createTextNode(vdom);
    }

    let {type, props} = vdom;

    if(typeof vdom.type === "function"){
        return mountFunctionComponent(vdom);
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

function updateProps(props, dom) {
    for (const key in props) {
        if (key === "children") continue; // children放在后面处理
        if (key === "style") {
            for (const styleKey in props.style) {
                dom.style[styleKey] = props.style[styleKey];
            }
            continue;
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
