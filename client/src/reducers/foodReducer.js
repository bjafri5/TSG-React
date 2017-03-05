import {
    ADD_FOOD_PENDING,
    ADD_FOOD_FULFILLED,
    ADD_FOOD_REJECTED,
    GET_FOODS_FULFILLED,
    GET_FOODS_PENDING,
    GET_FOODS_REJECTED
} from '../actions/foodActions';

const initialState = {
    foodData: null,
    error: null
}

export default function foodReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FOOD_FULFILLED:
            return { ...state, foodData: [...state.foodData, action.payload.data] }
        case ADD_FOOD_REJECTED:
            return { ...state, error: action.payload }
        case GET_FOODS_FULFILLED:
            console.log('foodData', action.payload.data);
            return { ...state, foodData: action.payload.data }
        case GET_FOODS_REJECTED:
            return { ...state, error: action.payload }
    }
    return state;
}