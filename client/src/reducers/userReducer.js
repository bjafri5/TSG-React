import {
    INIT_USER,
    EJECT_USER,
    UPDATE_USER_PENDING,
    UPDATE_USER_FULFILLED,
    UPDATE_USER_REJECTED,
} from '../actions/userActions';

const initialState = {
    updating: false,
    userData: JSON.parse(localStorage.getItem('user_data')),
    error: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_USER: {
            return {
                ...state,
                updating: false,
                error: null,
                userData: action.payload.userData
            }
        }
        case UPDATE_USER_PENDING: {
            return {
                ...state,
                updating: true,
                error: null
            }
        }
        case UPDATE_USER_FULFILLED: {
            return {
                ...state,
                updating: false,
                userData: action.payload.data,
                error: null
            }
        }
        case UPDATE_USER_REJECTED: {
            return {
                ...state,
                updating: false,
                error: action.payload
            }
        }
        case EJECT_USER: {
            return {
                ...state,
                userData: null,
                error: null
            };
        }
    }
    return state;
}