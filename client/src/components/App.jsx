import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { connect } from 'react-redux';
import { doAuthentication } from '../actions/lockActions';
import LoginLoading from './LoginLoading.jsx'

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar brand={this.props.route.name} currentPath={this.props.location.pathname} logo={"img/food-logo.png"} />
                {this.props.children}
                <Footer brand={this.props.route.name} />
            </div>
        );
    }
}
