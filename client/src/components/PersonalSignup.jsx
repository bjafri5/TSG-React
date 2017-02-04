import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions/userActions';

class PersonalSignup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resultHidden: true,
            user: {
                name: this.props.name,
                email: this.props.email,
                address: this.props.address
            }
        }
    }

    updateUser(newUser) {
        this.setState(Object.assign({}, this.state, {
            resultHidden: true,
            user: newUser
        }));
    }

    updateName(event) {
        let newUser = Object.assign({}, this.state.user, {
            name: event.target.value
        });
        this.updateUser(newUser);
    }

    updateEmail(event) {
        let newUser = Object.assign({}, this.state.user, {
            email: event.target.value
        })
        this.updateUser(newUser);
    }

    updateAddress(event) {
        let newUser = Object.assign({}, this.state.user, {
            address: event.target.value
        })
        this.updateUser(newUser);
    }

    submit(event) {
        event.preventDefault();
        const updatedUser = {
            connection: this.props.userConnection,
            email: this.props.isSocial ? undefined : this.state.user.email,
            user_metadata: {
                displayName: this.state.user.name,
                address: this.state.user.address
            }
        }
        console.log(updatedUser);
        this.props.updateUser(this.props.userId, updatedUser);
        this.setState(Object.assign({}, this.state, { resultHidden: false }));
    }

    isValid() {
        if (this.props.name !== this.state.user.name ||
            this.props.email !== this.state.user.email ||
            this.props.address !== this.state.user.address) {
            return !!this.state.user.name && !!this.state.user.email
        }
        return false;
    }

    getUpdateResult() {
        if (this.props.userUpdating) {
            return 'Updating';
        } else if (this.props.updateError) {
            return 'An error occured while updating. Please try again later.'
        }
        return 'Updated';
    }

    getUpdateColor() {
        if (this.props.userUpdating || this.props.updateError) {
            return ' gradient-red';
        }
        return ' gradient-green';
    }

    render() {
        return (
            <div className="container form-container">
                <div className="col-sm-8 col-sm-offset-2 signup-form gradient">
                    <form noValidate>
                        <h2 className="font-weight-bold">Personal Information</h2>
                        <div hidden={this.state.resultHidden} className={"form-result" + this.getUpdateColor()}>{this.getUpdateResult()}</div>
                        <br />
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <div className="form-group">
                                    <label htmlFor="displayName">Display Name</label>
                                    <input disabled={this.props.userUpdating} type="text" value={this.state.user.name} onChange={this.updateName.bind(this)} className="form-control" id="displayName" name="displayName" placeholder="Enter your display name" required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input disabled={this.props.isSocial || this.props.userUpdating} type="text" value={this.state.user.email} onChange={this.updateEmail.bind(this)} className="form-control" id="email" name="email" placeholder="Enter your email" required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input disabled={this.props.userUpdating} type="text" value={this.state.user.address} onChange={this.updateAddress.bind(this)} className="form-control" id="address" name="address" placeholder="Enter your address" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={!this.isValid() || this.props.userUpdating} onClick={this.submit.bind(this)} className="btn btn-primary btn-lg center-block">Save</button>

                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        const profile = state.user.userData; 
        let displayName = profile.given_name || profile.nickname;
        displayName = profile.user_metadata ? profile.user_metadata.displayName : displayName;
        return {
            email: profile.email,
            name: displayName,
            address: (profile.user_metadata ? profile.user_metadata.address : undefined),
            userId: profile.user_id,
            isSocial: profile.identities[0].isSocial,
            userConnection: profile.identities[0].connection,
            userUpdating: state.user.updating,
            updateError: state.user.error
        }
    },
    (dispatch) => {
        return {
            updateUser: (userId, updatedUser) => {
                dispatch(updateUser(userId, updatedUser));
            }
        }
    }
)(PersonalSignup);