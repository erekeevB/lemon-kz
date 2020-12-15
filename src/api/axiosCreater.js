import * as axios from 'axios';

export const Ajax = axios.create({

    baseURL: 'http://localhost:8080/',
    withCredentials: true,
    credentials: true,
    origin: 'http://localhost:8080/',
    headers:{
        'Access-Control-Allow-Credentials': true,
    }
})