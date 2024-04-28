import axios from 'axios';

const service = axios.create({
    baseURL: '/api',
    withCredentials: true
});

export default service;