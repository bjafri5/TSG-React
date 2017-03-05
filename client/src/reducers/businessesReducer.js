import {
    ADD_BUSINESS_PENDING,
    ADD_BUSINESS_FULFILLED,
    ADD_BUSINESS_REJECTED,
    GET_BUSINESSES_FULFILLED,
    GET_BUSINESSES_PENDING,
    GET_BUSINESSES_REJECTED,
    SET_CURRENT_BUSINESS
} from '../actions/businessActions';

const initialState = {
    businessesData: null,
    currentBusiness: null,
    error: null
}

export default function businessesReducer(state=initialState, action) {
    switch(action.type) {
        case ADD_BUSINESS_FULFILLED: 
            return {...state, businessesData: [...state.businessesData, action.payload.data]}
        case ADD_BUSINESS_REJECTED: 
            return {...state, error: action.payload}
        case GET_BUSINESSES_FULFILLED: 
            return {...state, businessesData: action.payload.data}
        case GET_BUSINESSES_REJECTED: 
            return {...state, error: action.payload}
        case SET_CURRENT_BUSINESS:
            return {...state, currentBusiness: action.payload}
    }
    return state;
}