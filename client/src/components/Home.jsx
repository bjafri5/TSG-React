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
                {
                    (screen.width <= 800) ? 
                    <Carousel img1={"img/food-background1-mobile.jpg"} 
                        img2={"img/food-background2-mobile.jpg"} 
                        img3={"img/food-background3-mobile.jpg"} />
                    : 
                    <Carousel img1={"img/food-background1.jpg"} 
                        img2={"img/food-background2.jpg"} 
                        img3={"img/food-background3.jpg"} />
                } 
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