/*
 * 请求接口测试的工具：postman
 * 
 * axios：基于Promise封装的ajax库（核心还是ajax的四步操作）
 *   + ajax请求一般都是采用异步
 *      + ajax的串行：第一个接口请求成功，才能继续请求第二个...
 *      + ajax的并行：同时发送多个接口请求，当所有接口都请求成功，再去执行某些事情  => Promise.all
 *   + 基于Promise管理ajax的异步操作
 * 
 * Fetch：浏览器新增的API，默认就是基于Promise管理的(核心不是XMLHttpRequest)
 * 
 * http://www.axios-js.com/zh-cn/docs/
 * 
 * 1. axios的基础使用
 * 2. axios的二次封装
 *    + 拦截器
 *    + 一些常规配置
 * 3. axios源码（基于Promise封装一个ajax库）
 */

/* == axios的基础使用 == */
// 返回的结果都是一个Promise实例
// axios([config])
// axios([url],[config])
// axios.get/head/delete/options([url],[config])
// axios.post/put([url],[data],[config])

let baseURL = "http://127.0.0.1:8888";
/* axios({
    url: 'http://127.0.0.1:8888/user/list',
    method: 'get',
    ...
}); */
axios.get('/user/list', {
    // 请求地址的公共部分：最后请求的地址 baseURL+url
    baseURL,
    // 自定义请求头信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 设置请求超时时间：超过设定的时间，请求自动中断
    timeout: 0,
    // 在CORS跨域请求中，是否允许携带资源凭证
    withCredentials: true,
    // 预设服务器返回的数据内容：服务器该返回啥还是啥（后台决定返回格式[可以商量]）,而预设的意思是，把服务器返回的结果，处理成想要的数据格式，支持设定的格式：'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json',
    // 它规定了请求结果中，哪些状态码代表请求成功，哪些代表失败，从而决定执行then/catch
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    },
    // GET请求传递参数：最后都会拼接到URL的末尾（必须是一个无格式对象(plain object)或URLSearchParams对象）
    params: {
        departmentId: 0,
        search: ''
    }
}).then(response => {
    // 从服务器成功获取数据
    // status / statusText：状态码的描述
    // request：原生的xhr对象
    // headers：存储部分响应头信息
    // config：我们发送请求的配置项
    // data：服务器响应主体的信息（我们获取的数据）
    return response.data;
}).catch(reason => {
    // 从服务器获取数据失败
    // 返回的是Error类的实例
    // message：错误信息
    // request：原生的xhr对象
    // config：我们发送请求的配置项
    // response：等同于成功的response，但是可能没有，如果向服务器发请求，服务器接受了，但是返回非2开头的状态码（虽然是失败，但是最起码告诉我们具体的结果了），这种是有response的；如果请求没有到达服务器（比如断网），则没有response；
    console.dir(reason);
    return Promise.reject(reason.message);
}).then(result => {
    // result === response.data
    console.log("响应主体信息", result);
});

/* axios({
    url: 'http://127.0.0.1:8888/user/update',
    method: 'post',
    data:{...}
    ...
}); */
axios.post('/user/update', {
    userId: 1,
    desc: '你好世界'
}, {
    baseURL,
    // POST是基于请求主体传递给服务器信息
    // 传递的数据格式：form-data /  x-www-from-urlencoded / raw / binary / GraphQL
    // form-data：一般用于表单提交或者文件流（文件上传）    multipart/form-data
    // x-www-from-urlencoded：xxx=xxx&xxx=xxx&xxx=xxx  application/x-www-from-urlencoded
    // raw ：文本格式  “普通文本 text/plain”  “JSON字符串 application/json”
    // binary：进制编码格式  application/octet-stream
    headers: {
        "Content-Type": "application/x-www-from-urlencoded"
    },
    // 把请求主体传递的信息，在发送给服务器之前，变为我们想要的格式
    transformRequest: data => {
        // data就是我们配置的对象
        return Qs.stringify(data);
    }
});


// URLSearchParams浏览器新增的处理问号参数的类
// let obj = new URLSearchParams('lx=1&age=20&from=weixin');
// console.log(...obj.keys());



/* 
// 返回的是Promise实例
axios.get('http://127.0.0.1:8888/api1').then(response => {
    return axios.get('http://127.0.0.1:8888/api12');
}).then(response => {
    // ...
}); 
*/

/* 
// ajax串行：传统方案会引发回调地狱
$.ajax({
    url: 'http://127.0.0.1:8888/api1',
    success: result => {
        $.ajax({
            url: 'http://127.0.0.1:8888/api12',
            success: result => {
                $.ajax({
                    url: 'http://127.0.0.1:8888/api12',
                    success: result => {

                    }
                });
            }
        });
    }
}); 
*/