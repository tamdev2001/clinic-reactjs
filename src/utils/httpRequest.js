import axios from 'axios';
import authHeader from '~/services/auth-header';

const request = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: authHeader(),
});

export default request;
