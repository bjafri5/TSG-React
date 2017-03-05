import axios from 'axios';


function getConfig() {
    const token = localStorage.getItem('id_token');
    return {
        headers: { 'Authorization': `Bearer ${token}` }
    }
}

export const ADD_FOOD_PENDING = 'ADD_FOOD_PENDING';
export const ADD_FOOD_FULFILLED = 'ADD_FOOD_FULFILLED';
export const ADD_FOOD_REJECTED = 'ADD_FOOD_REJECTED';
export const GET_FOODS_PENDING = 'GET_FOODS_PENDING';
export const GET_FOODS_FULFILLED = 'GET_FOODS_FULFILLED';
export const GET_FOODS_REJECTED = 'GET_FOODS_REJECTED';

export function addFood(food) {
    return {
        type: 'ADD_FOOD',
        payload: axios.post('/api/food', food, getConfig())
    }
}

export function getFoods(businessName) {
    return {
        type: 'GET_FOODS',
        payload: axios.get(`/api/foods/${businessName}`, getConfig())
    }
}