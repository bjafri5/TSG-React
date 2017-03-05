import axios from 'axios';

function getConfig() {
    const token = localStorage.getItem('id_token');
    return {
        headers: { 'Authorization': `Bearer ${token}` }
    }
}

export const ADD_BUSINESS_PENDING = 'ADD_BUSINESS_PENDING';
export const ADD_BUSINESS_FULFILLED = 'ADD_BUSINESS_FULFILLED';
export const ADD_BUSINESS_REJECTED = 'ADD_BUSINESS_REJECTED';
export const GET_BUSINESSES_PENDING = 'GET_BUSINESSES_PENDING';
export const GET_BUSINESSES_FULFILLED = 'GET_BUSINESSES_FULFILLED';
export const GET_BUSINESSES_REJECTED = 'GET_BUSINESSES_REJECTED';
export const SET_CURRENT_BUSINESS = 'SET_CURRENT_BUSINESS';

export function addBusiness(business) {
    return {
        type: 'ADD_BUSINESS',
        payload: axios.post('/api/business', business, getConfig())
    }
}

export function setCurrentBusiness(business) {
    return {
        type: SET_CURRENT_BUSINESS,
        payload: business
    }
}


export function getBusinesses(userId) {
    if (userId) {
        return {
            type: 'GET_BUSINESSES',
            payload: axios.get(`api/businesses/${userId}`, getConfig())
        }
    } else {
        return {
            type: 'GET_BUSINESSES',
            payload: axios.get('api/businesses', getConfig())
        }
    }
}