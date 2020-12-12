import { getCityListAPI, getSearchResultAPI } from "../API/searchAPI";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const SET_CITIES = 'SET_CITIES';
const SET_INPUT_DATE = 'SET_INPUT_DATE';
const SET_INPUT_CITY = 'SET_INPUT_CITY';
const CHANGE_INPUT_GUEST_NUM = 'CHANGE_INPUT_GUEST_NUM';
const SET_INPUT_GUEST_NUM = 'SET_INPUT_GUEST_NUM';

const SET_HOTELS = 'SET_HOTELS';

const SET_ERROR = 'SET_ERROR';

let initialState = {

    cities: [],
    hotels: [],
    input: {
        city: '',
        startDate: null,
        endDate: null,
        numOfPeople: {
            adult: 0,
            children: 0
        }
    },
    isFetching: false,
    error: ''

}

const searchReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CITIES: {
            return {
                ...state,
                cities: [...action.cities]
            }
        }
        case SET_INPUT_DATE: {

            if(action.dtype===1){
                return {
                    ...state,
                    input: {...state.input, startDate: action.date}
                }
            }else{
                return {
                    ...state,
                    input: {...state.input, endDate: action.date}
                }
            }

        }
        case SET_INPUT_CITY: {
            return {
                ...state,
                input: {...state.input, city: action.city}
            }
        }
        case SET_INPUT_GUEST_NUM: {
            return {
                ...state,
                input:
                {
                    ...state.input,
                    numOfPeople:
                    {
                        ...state.input.numOfPeople,
                        adult: action.adult,
                        children: action.children
                    }
                }
            }
        }
        case CHANGE_INPUT_GUEST_NUM: {
            if(action.isAdult===1){
                return{
                    ...state,
                    input: 
                    {
                        ...state.input, 
                        numOfPeople: 
                        {
                            ...state.input.numOfPeople,
                            adult: state.input.numOfPeople.adult+action.addNum
                        }
                    }
                }
            }else{
                return{
                    ...state,
                    input: 
                    {
                        ...state.input, 
                        numOfPeople: 
                        {
                            ...state.input.numOfPeople, 
                            children: state.input.numOfPeople.children+action.addNum,
                            adult: state.input.numOfPeople.adult===0 ? 1 : state.input.numOfPeople.adult
                        }
                    }
                }
            }
        }
        case SET_HOTELS: {
            return {
                ...state,
                hotels: [...action.hotels]
            }
        }
        case TOGGLE_IS_FETCHING: {

            return {
                ...state,
                isFetching: action.isFetching
            }

        }
        default:
            return state;

    }

}

export const toggleFetch = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const setCities = (cities) => ({ type: SET_CITIES, cities });

export const setHotels = (hotels) => ({type: SET_HOTELS, hotels})

//-----INPUT--------------

export const setDate = (date, dtype) => ({ type: SET_INPUT_DATE, date, dtype });

export const setCity = (city) => ({ type: SET_INPUT_CITY, city });

export const changeGuestNum = (isAdult, addNum) => ({ type: CHANGE_INPUT_GUEST_NUM, isAdult, addNum });

export const setGuestNum = (adult, children) => ({ type: SET_INPUT_GUEST_NUM, adult, children });

//---------------------

export const setError = (error) => ({ type: SET_ERROR, error });


export const getSetCitiesThunk = () => (dispatch) => {

    let data = ['Nur-Sultan', 'Temirtau', 'Aktobe', 'Pavlodar'];

    dispatch(setCities(data));

}

export const searchThunk = () => (dispatch) => {

    let data = [
        {hotelId: 1, hotelName: 'ei', hotelAddress: 'Aktobe', roomTypes: [
            {roomTypeId: 1, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000},
            {roomTypeId: 2, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000}
        ]},
        {hotelId: 2, hotelName: 'B-)', hotelAddress: 'Aktobe', roomTypes: [
            {roomTypeId: 1, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000},
            {roomTypeId: 2, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000},
            {roomTypeId: 3, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000}
        ]},
        {hotelId: 3, hotelName: 'op op op', hotelAddress: 'Aktobe', roomTypes: [
            {roomTypeId: 1, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000}
        ]},
        {hotelId: 4, hotelName: 'grin', hotelAddress: 'Temirtau', roomTypes: [
            {roomTypeId: 1, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000},
            {roomTypeId: 2, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000},
            {roomTypeId: 3, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000},
            {roomTypeId: 4, roomTypePeople: 10, roomTypeSize: 456, discountPrice: 20110, originalPrice: 30000}
        ]}
    ]

    dispatch(setHotels(data));

    // getSearchResultAPI()
    //     .then((data)=>{

                //dispatch(setHotels(data));

    //     })

}

export default searchReducer;