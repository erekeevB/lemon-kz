import {Ajax} from './axiosCreater';

export const loginAPI = ({username, password}) => {

    return Ajax.post('/signin', {username, password}).then(data=>data.data)

}

export const registerAPI = (profile) => {

    return Ajax.post('/registration', {...profile}).then(data=>data.data)

}

export const logoutAPI = () => {

    return Ajax.get('/signout').then(data=>data.data)

}

export const currentUserAPI = () => {

    return Ajax.get('/api/v1/currentuser').then(data=>data.data)

}

export const getFavouritesAPI = () => {

    return Ajax.get('products?limit=5').then(data=>data)

}