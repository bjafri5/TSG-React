import {combineReducers} from 'redux';
import foodTypesReducer from './foodTypesReducer';
import lockReducer from './lockReducer';
import userReducer from './userReducer';
import businessesReducer from './businessesReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    foodTypes: foodTypesReducer,
    lock: lockReducer,
    user: userReducer,
    form: formReducer,
    businesses: businessesReducer
});