import {Ajax} from './axiosCreater';

export const loginAPI = ({username, password}) => {

    return Ajax.post('/signin', {username, password}).then(data=>data.data)

}

export const getFavouritesAPI = () => {

    return Ajax.get('products?limit=5').then(data=>data)

}