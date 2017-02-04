import axios from 'axios';

export const UPDATE_USER_PENDING = 'UPDATE_USER_PENDING';
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED';
export const UPDATE_USER_REJECTED = 'UPDATE_USER_REJECTED';
export const INIT_USER = 'INIT_USER';
export const EJECT_USER = 'EJECT_USER';


function getConfig() {
    const token = localStorage.getItem('id_token');
    return {
        headers: { 'Authorization': `Bearer ${token}` }
    }
}

export function initUser(user) {
    return {
        type: INIT_USER,
        payload: {
            userData: user
        }
    }
}

export function ejectUser() {
    return {
        type: EJECT_USER
    }
}

export function updateUser(userId, updatedUser) {
    return {
        type: 'UPDATE_USER',
        payload: axios.patch(`/api/updateAuthUser/${userId}`, updatedUser, getConfig())
    }
}