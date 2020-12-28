import {Ajax} from './axiosCreater';

export const getSearchResultAPI = (isAll, categoryName) => {

    if(isAll){
        return Ajax.get('/products').then(data=>data.data)
    }else{
        if(categoryName === 'men' || categoryName === 'women') {
            return Ajax.get('/products/category/' + categoryName + ' clothing').then(data=>data.data)
        }else{
            return Ajax.get('/products/category/' + categoryName).then(data=>data.data)
        }
    }

}

export const getItemAPI = (id) => {

    return Ajax.get('/products/' + id).then(data=>data.data)

}