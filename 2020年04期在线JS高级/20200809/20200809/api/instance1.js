import axios from './axios';
let instance1 = axios.create({
    baseURL: "http://127.0.0.1:8888"
});
instance1.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
instance1.defaults.transformRequest = data => Qs.stringify(data);

export default instance1;