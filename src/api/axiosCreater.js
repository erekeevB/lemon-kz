import * as axios from 'axios';

export const Ajax = axios.create({

    baseURL: 'https://fakestoreapi.com/'
    // withCredentials: true,
    // credentials: true,
    // origin: 'http://localhost:8080/',
    // headers:{
    //     'Access-Control-Allow-Credentials': true,
    // }
})