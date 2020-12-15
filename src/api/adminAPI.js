import {Ajax} from './axiosCreater';

export const getUsersAPI = () => {

    return Ajax.get('/admin/getusers').then(data=>data.data)

}

export const deleteUserAPI = (userId) => {

    return Ajax.post('/admin?userId='+userId+'&action=delete', {}).then(data=>data.data)

}