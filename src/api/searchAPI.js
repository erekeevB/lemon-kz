import {Ajax} from './axiosCreater';

export const getClothesList = () => {

    return Ajax.get('carts').then(data=>data)

}

export const getSearchResultAPI = (form) => {

    return Ajax.get('/reserve/findrooms-withindate', {...form}).then(data=>data.data)

}