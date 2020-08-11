/*
 * 真实项目中，我们发现很多请求配置的参数都是一样的，我们想要提取这些公共的配置 “axios的二次封装/二次配置” 
 *  + axios库中的默认配置
 *  + 提取的公共参数配置  axios.defaults
 *  + 发送请求时单独写的配置  axios.get([url],[config])
 * 优先级自下而上（最后一个优先级最高）
 */
// 需求1:真实项目中，我们可能需要基于环境变量（开始/测试/生产）控制地址前缀不一样
/* let env = process.env.NODE_ENV; //获取 webpack/package.json 中配置的环境变量
switch (env) {
    case "production":
        axios.defaults.baseURL = "http://api.zhufengpeixun.cn";
        break;
    case "test":
        axios.defaults.baseURL = "http://192.168.20.12:8888";
        break;
    default:
        axios.defaults.baseURL = "http://127.0.0.1:8888";
} */
axios.defaults.baseURL = "http://127.0.0.1:8888";
axios.defaults.timeout = 0;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
axios.defaults.transformRequest = data => Qs.stringify(data);
axios.defaults.validateStatus = status => (status >= 200 && status < 300);

// 请求拦截器
axios.interceptors.request.use(config => {
    // config：存储现有配置项
    let token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
});

// 响应拦截器
axios.interceptors.response.use(response => {
    // response：成功返回的结果
    return response.data;
}, reason => {
    // reason：失败返回的信息
    // 统一在这里针对于失败的结果做不同的提示后者处理
    if (reason.response) {
        // 服务器返回信息，只是状态码不是2开始的:根据不同状态码做不同的提示
        switch (reason.response.status) {
            case 401:
                // 权限问题（都是后台反馈的）
                break;
            case 403:
                // TOKEN过期
                break;
            case 404:
                // 地址错误
                break;
        }
    } else {
        // 需要检验是否断网
        if (!navigator.onLine) {

        }
    }
    return Promise.reject(reason.message);
});


axios.get('/user/list').then(result => {
    // 基于响应拦截器处理后的：响应主体信息
    console.log(result);
});