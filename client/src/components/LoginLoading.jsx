import React from 'react';
import { connect } from 'react-redux';
import { doAuthentication } from '../actions/lockActions';

class LoginLoading extends React.Component {

    constructor(props) {
        super(props);
        this.props.doAuthentication();
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.percentAuthenticated <= 0) {
                this.props.router.push('/');
            }
        }, 1000);
    }

    render() {
        return (
            <div className="container loading-container">
                <h2>LOADING PROFILE...</h2>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow={this.props.percentAuthenticated}
                        aria-valuemax="100" style={{ width: this.props.percentAuthenticated + "%" }}>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    (state) => {
        return {
            percentAuthenticated: state.lock.percentAuthenticated
        }
    },
    (dispatch) => {
        return {
            doAuthentication: () => {
                dispatch(doAuthentication())
            }
        }
    }
)(LoginLoading);