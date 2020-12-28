import * as axios from 'axios';

export const Ajax = axios.create({
    baseURL: 'https://fakestoreapi.com/'
})