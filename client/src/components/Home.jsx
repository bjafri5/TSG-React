import React from 'react';
import Carousel from './Carousel.jsx';
import MainSelection from './MainSelection.jsx';
import SignupMessage from './SignupMessage.jsx';
import { connect } from 'react-redux';
import { signup } from '../actions/lockActions';
import ProfileHeader from './ProfileHeader.jsx';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.signupMessage = `Let us help you promote your eatery. 
                        Easily upload information about your eatery so that it'll show up in search results.
						It's absolutely free! You have nothing to lose and a lot to gain.`;
    }
    
    render() {
        if (this.props.authenticated) {
            return (
                <div>
                    <ProfileHeader />
                    <MainSelection />
                    <hr />
                    <SignupMessage heading={"Add a Business"} 
                        text={this.signupMessage}
                        signup={() => {this.props.router.push('business-signup')}}/>
                </div>
            );
        }
        return (
            <div>
                <Carousel />
                <MainSelection />
                <hr />
                <SignupMessage heading={"Sign Up"} 
                    text={this.signupMessage} 
                    signup={this.props.signup}/>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            authenticated: state.lock.authenticated
        }
    }
    ,
    (dispatch) => {
        return {
            signup: () => {
                dispatch(signup());
            }
        }
    }
)(Home);