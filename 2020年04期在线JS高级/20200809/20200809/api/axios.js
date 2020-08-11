import axios from 'axios';
// 基础配置
axios.defaults.timeout = 0;
axios.defaults.withCredentials = true;
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

export default axios;