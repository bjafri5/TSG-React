import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, AUTHENTICATING } from '../actions/lockActions';
import jwtDecode from 'jwt-decode';

const checkTokenExpiry = (jwt) => {
    if (jwt) {
        try {
            let jwtExp = jwtDecode(jwt).exp;
            let expiryDate = new Date(0);
            expiryDate.setUTCSeconds(jwtExp);
            if (new Date() < expiryDate) {
                return true;
            }
        } catch (err) {
            return false;
        }
    }
    return false;
}

const initialState = {
    authenticated: checkTokenExpiry(localStorage.getItem('id_token')),
    authenticating: false,
    percentAuthenticated: 0,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATING: {
            return {
                ...state,
                authenticated: false,
                authenticating: true,
                percentAuthenticated: action.payload.percentAuthenticated
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                authenticated: true,
                authenticating: false,
                percentAuthenticated: 100
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                authenticated: false,
                authenticating: false,
                error: action.payload.error
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                authenticated: false,
                authenticating: false,
                percentAuthenticated: 0,
                error: null
            }
        }
    }
    return state;
}