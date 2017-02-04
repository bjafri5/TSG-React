import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import FoodSelection from './components/FoodSelection.jsx';
import LoginLoading from './components/LoginLoading.jsx';
import BusinessSignup from './components/BusinessSignup.jsx';
import PersonalSignup from './components/PersonalSignup.jsx';
import PersonalSignupRedux from './components/PersonalSignupRedux.jsx';
import store from './store';
import { login } from './actions/lockActions';

const requireAuth = (nextState, replace) => {
    if (!store.getState().lock.authenticated) {
        store.dispatch(login());
        replace({ pathname: '/' })
    }
}

const loginLoadingHandler = (nextState, replace) => {
    if (!(nextState.location.hash.includes('id_token') ||
        nextState.location.hash.includes('access_token') ||
        nextState.location.hash.includes('token_type')) ||
        store.getState().lock.authenticated) {
        replace({ pathname: '/' });
    }
}

const routes = (
    <div>
        <Route component={App} name="The Swot's Guide">
            <Route path='/' component={Home} />
            <Route path='food-selection' component={FoodSelection} />
            <Route path='business-signup' component={BusinessSignup} onEnter={requireAuth} />
            <Route path='personal-signup' component={PersonalSignupRedux} onEnter={requireAuth} />
        </Route>
        <Route path='login-loading' component={LoginLoading} onEnter={loginLoadingHandler} />
    </div>
);

export default (props) => {
    return (
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
            {routes}
        </Router>
    );
}
