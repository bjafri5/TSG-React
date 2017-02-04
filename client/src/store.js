import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import mainReducer from './reducers/mainReducer';

const middleware = applyMiddleware(promise(), thunk, logger());

const store = createStore(mainReducer, middleware);

store.subscribe(() => {
    let userData = store.getState().user.userData;
    if (userData) {
        localStorage.setItem('user_data', JSON.stringify(userData));
    }
});

export default store;