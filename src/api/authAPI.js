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

export const getReservationAPI = () => {

    return Ajax.get('./reserve/getallreservations').then(data=>data.data)

}

export const addReservationAPI = (reservation) => {

    return Ajax.post('/reserve/addreservation', {...reservation}).then(data=>data.data)

}