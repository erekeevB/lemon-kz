import { addRoomAPI, deleteRoomAPI, getRoomListAPI } from "../API/roomAPI";
import { setError, toggleFetch } from "./hotelReducer";

const SET_ROOMS = 'SET_ROOMS';
const DELETE_ROOM = 'DELETE_ROOM';
const ADD_ROOM = 'ADD_ROOM';

let initialState = {

    rooms: {
        names: ['roomNumber', 'roomFloor', 'roomTypeId'],
        compactNames: ['roomNumber','roomFloor'],
        list: []
    },

}

const roomReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_ROOMS: {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    list: [...action.rooms]
                }
            }
        }
        case DELETE_ROOM: {
            let temp = {
                ...state,
                rooms: {
                    ...state.rooms, 
                    list: [...state.rooms.list.filter((room) => {
                        debugger
                        return room.roomNumber !== action.roomNumber})]
                }
            }
            debugger
            return temp
        }
        case ADD_ROOM: {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    list: [...state.rooms.list, action.room]
                }
            }
        }
        default:
            return state;

    }

}

export const setRooms = (rooms) => ({type: SET_ROOMS, rooms});

export const deleteRoom = (roomNumber) => ({ type: DELETE_ROOM, roomNumber });

export const addRoom = (room) => ({ type: ADD_ROOM, room });


export const getSetRoomsThunk = (hotelId) => (dispatch) => {

    let data = [
        {roomNumber: 1024, hotelId: 1, roomTypeId: 1, roomFloor: 23},
        {roomNumber: 2232, hotelId: 1, roomTypeId: 2, roomFloor: 24},
        {roomNumber: 323, hotelId: 1, roomTypeId: 1, roomFloor: 25},
        {roomNumber: 423, hotelId: 1, roomTypeId: 2, roomFloor: 24}
    ]

    dispatch(setRooms(data));


    // dispatch(toggleFetch(true));

    // getRoomListAPI(hotelId)
    //     .then((data) => {

    //         dispatch(setRooms(data));
    //         dispatch(setError(''));

    //     })
    //     .catch(() => {

    //         dispatch(setRooms([]));
    //         dispatch(setError('Error connecting to server!'));

    //     })
        

}

export const deleteRoomThunk = (hotelId, roomId) => (dispatch) => {

    dispatch(deleteRoom(roomId));


    // deleteRoomAPI(hotelId, roomId)
    //     .then(data => {

    //         if (data.status === 0) {

    //             dispatch(deleteRoom(roomId));

    //             dispatch(setError(''));

    //         } else {

    //             dispatch(setError('Something went wrong!'));

    //         }

    //     })
    //     .catch(() => {

    //         dispatch(setError('Something went wrong!'));

    //     })

}

export const addRoomThunk = (hotelId, room) => (dispatch) => {

    dispatch(addRoom(room));


    // addRoomAPI(hotelId, room)
    //     .then(data => {

    //         if (data.status === 0) {

    //             dispatch(addRoom(data.room));

    //             dispatch(setError(''));

    //         } else {

    //             dispatch(setError('This Room already exists.'));

    //         }

    //     })
    //     .catch(() => {

    //         dispatch(setError('Something went wrong!'));

    //     })

}

export default roomReducer;