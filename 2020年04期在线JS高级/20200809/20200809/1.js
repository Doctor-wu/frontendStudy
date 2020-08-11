/*
 * AJAX：前后端数据通信非常重要的手段，基于AJAX从服务器获取数据，基于客户端实现数据的渲染
 *   + JQ: $.ajax([options])
 *   + AXIOS
 *   + ...
 * 
 * Fetch：新的通信方案，和AJAX不是同一套机制
 * 
 * 跨域处理：
 *   + jsonp
 *   + iframe（document.domain/localtion.hash...）
 *   + postMessage
 *   + CORS
 *   + proxy
 *   + ...
 */

// 在最早期，我们基于ajax从服务获取的数据格式基本都以 xml 格式为主，只不过现在都是以 json 格式为主
// ajax : async javascript and xml
// XMLHttpRequest : 也就是基于http请求从服务器拿到xml格式的数据

// 创建一个XHR对象（AJAX实例）
let xhr = new XMLHttpRequest;

// 打开请求API地址（发送之前的一些配置信息）
// xhr.open([method],[url],[async 默认true],[username],[userpass])
// 请求方法：GET系列(get/head/delete/options)  POST系列(post/put)
// + GET请求传递给服务器的信息一般基于 “URL问号参数”
// + POST请求传递给服务器的信息一般基于 “请求主体”
// + 所有请求方式都可以基于请求头把信息传递给服务器
xhr.open('get', './data.json');

// 设置请求头信息
xhr.setRequestHeader('xxx', 'zhufeng');

// 监听请求的进度 当ajax状态改变
// + xhr.readyState
//   + 2 响应头信息返回
//   + 4 响应主体信息返回
// + xhr.status
//   + 不是所有的请求都一定成功，网络状态码记录了这个结果
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        // 获取响应头信息
        // console.log(xhr.getResponseHeader('date'));
        // console.log(xhr.getAllResponseHeaders());

        // 获取响应主体信息
        // xhr.responseText;  (最常用)
        // xhr.responseXML;
        // xhr.response;
        // xhr.responseType;
        console.log(JSON.parse(xhr.responseText));
    }
};

// 发送请求
// xhr.send([请求主体信息])
xhr.send(JSON.stringify({
    name: 'zxt'
}));