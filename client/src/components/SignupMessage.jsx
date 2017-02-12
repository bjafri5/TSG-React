import React from 'react';

export default class SignupMessage extends React.Component {

    signup(e) {
        e.preventDefault();
        this.props.signup();
    }

    render() {
        return (
            <div className="container marketing">
                <div className="row signup-row gradient">
                    <div className="col-md-7 col-md-push-5">
                        <h2><a onClick={this.signup.bind(this)}>{this.props.heading} &raquo;</a></h2>
                        <div className="signup-info">
                            <p className="lead">{this.props.text}</p>
                        </div>
                    </div>
                    <div className="col-md-5 col-md-pull-7">
                        <img className="img-responsive center-block" width="500px" height="250px" src="img/signup.jpg"
                            alt="kitchen" />
                    </div>
                </div>
            </div>
        );
    }
}