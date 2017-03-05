import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
import { initUser, ejectUser } from './userActions';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const AUTHENTICATING = 'AUTHENTICATING';

function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: {
      error
    }
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

function authenticating(percentAuthenticated) {
  return {
    type: AUTHENTICATING,
    payload: {
      percentAuthenticated
    }
  }
}

const lock = new Auth0Lock('0r7O6A4SiVTwjEG6LQDoGP7byPqHsSlY', 'bjafri5.auth0.com', {
  languageDictionary: {
    title: "The Swot's Guide"
  },
  theme: {
    logo: 'img/food-logo.png',
    primaryColor: '#4c4751'
  },
  auth: {
    redirectUrl: 'https://theswotsguide.herokuapp.com/login-loading' || 'https://localhost:5000/login-loading',
    responseType: 'token'
  },
  usernameStyle: 'email',
  rememberLastLogin: true
});

export function login() {
  return (dispatch) => {
    localStorage.setItem('redirect_path', window.location.pathname);
    lock.show();
  }
}

export function signup() {
  return (dispatch) => {
    localStorage.setItem('redirect_path', window.location.pathname);
    lock.show({
      initialScreen: 'signUp'
    });
  }
}

export function doAuthentication() {
  return (dispatch) => {
    lock.on("authenticated", (authResult) => {
      dispatch(authenticating(50));
      lock.getUserInfo(authResult.accessToken, (error, profile) => {
        dispatch(authenticating(95));
        if (error) {
          return dispatch(loginError(error))
        }
        localStorage.setItem('id_token', authResult.idToken)
        setTimeout(() => {
          dispatch(initUser(profile));
          dispatch(loginSuccess());
          goToCachedUrl();
        }, 250);
      });
    });
  }
}

function goToCachedUrl() {
  let redirectPath = localStorage.getItem('redirect_path');
  localStorage.removeItem('redirect_path');
  browserHistory.push(redirectPath);
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_data');
    dispatch(ejectUser());
    return dispatch(logoutSuccess());
  };
}

