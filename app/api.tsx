import axios from 'axios';

console.log('api.js');
const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export default api;