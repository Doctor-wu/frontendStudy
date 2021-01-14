/**
 * 将JSX解析后的对象构建成虚拟DOM
 * @param type 元素标签
 * @param config 元素的配置项
 * @param children 子元素
 */
function createElement(type, config, children) {
    if (config) {
        delete config.__source;
        delete config.__self;
    }
    let props = {...config};
    if (arguments.length > 3) {
        children = [...arguments].slice(2);
    }
    props.children = children;
    return {
        type,
        props
    }
}

// {
//     "type": "div",
//     "key": null,
//     "ref": null,
//     "props": {
//         "className": "title",
//         "style": {
//             "color": "red"
//         },
//         "children": [...]
//     }
// }

const React = {createElement};
export default React;
