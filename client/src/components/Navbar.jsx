import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { login, logout, signup } from '../actions/lockActions';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        //localStorage.clear();
        this.prevScrollY = 0;
        this.hiddenNavbarThreshold = 5;
        this.navbarHeight = 50;
        this.cachedPath = this.props.currentPath
        this.state = {
            hidden: false
        }
    }

    hideNavbar(hide) {
        if (this.state.hidden !== hide) {
            this.setState({ hidden: hide });
        }
    }

    scrollHandler() {
        //console.log('scrollY: '+ window.scrollY, 'prevScrollY: ' + this.prevScrollY, 'navbarHeight: ' + this.navbarHeight);
        if (this.prevScrollY > 0 && window.scrollY > this.navbarHeight) {
            if (window.scrollY - this.prevScrollY >= this.hiddenNavbarThreshold) {
                this.hideNavbar(true);
            } else if (window.scrollY - this.prevScrollY <= -this.hiddenNavbarThreshold) {
                this.hideNavbar(false);
            }
        } else {
            this.hideNavbar(false);
        }
        this.prevScrollY = window.scrollY;
    }

    componentDidMount() {
        window.onscroll = this.scrollHandler.bind(this);
    }

    login(e) {
        e.preventDefault();
        this.props.login();
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    signup(e) {
        e.preventDefault();
        this.props.signup();
    }

    isHomePage() {
        return this.props.currentPath === '/';
    }

    render() {
        //to detect path change
        if (this.props.currentPath !== this.cachedPath) {
            this.cachedPath = this.props.currentPath;
            this.prevScrollY = 0;
        }
        return (
            <nav className={"navbar navbar-inverse navbar-fixed-top" + (this.state.hidden ? " hidden-navbar" : "")} role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                            aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand">
                            <img style={{ maxWidth: 35 + 'px', marginTop: -8 + 'px' }} src={this.props.logo} />
                        </a>
                        <Link to="/" className="navbar-brand">
                            {this.props.brand}
                        </Link>
                    </div>
                    <div id="navbar" className={"navbar-collapse collapse"  + (this.state.hidden ? " hide" : "")}>
                        <div className="navbar-form pull-right" role="form">
                            {
                                (!this.props.authenticated) ?
                                    <div>
                                        <button className="btn btn-primary btn-margin" onClick={this.login.bind(this)}>Log In</button>
                                        <button className="btn btn-primary btn-margin" onClick={this.signup.bind(this)}>Sign Up</button>
                                    </div> :
                                    null
                            }
                            {
                                (this.props.authenticated) ?
                                    <div>
                                        <Link to="personal-signup" hidden={!this.isHomePage()}><button className="btn btn-primary btn-margin">Update Profile</button></Link>
                                        <button className="btn btn-primary btn-margin" onClick={this.logout.bind(this)}>Log Out</button>
                                    </div> :
                                    null
                            }
                        </div>

                    </div>
                </div>
            </nav>
        );
    }
}

export default connect(
    (state) => {
        return {
            authenticated: state.lock.authenticated
        }
    },
    (dispatch) => {
        return {
            login: () => {
                dispatch(login());
            },
            logout: () => {
                dispatch(logout());
            },
            signup: () => {
                dispatch(signup());
            }
        }
    }
)(Navbar);