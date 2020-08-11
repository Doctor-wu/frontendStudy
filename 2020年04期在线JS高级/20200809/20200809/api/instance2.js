import axios from './axios';

let instance2 = axios.create({
    baseURL: "http://127.0.0.1:9999"
});
instance2.defaults.headers = {
    'Content-Type': 'multipart/form-data'
};

export default instance2;