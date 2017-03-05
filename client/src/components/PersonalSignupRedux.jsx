import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormContainer from './FormContainer.jsx';
import InputComponent from './InputComponent.jsx';
import FormResult from './FormResult.jsx';
import { connect } from 'react-redux';
import { updateUser } from '../actions/userActions';

class PersonalSignupRedux extends React.Component {

    handleSubmit(values) {
        const updatedUser = {
            connection: this.props.userConnection,
            email: this.props.isSocial ? undefined : values.email,
            user_metadata: {
                displayName: values.displayName,
                address: (values.address && values.address.trim()) ? values.address.trim() : undefined
            }
        }
        this.submitted = true;
        return this.props.updateUser(this.props.userId, updatedUser);
    }

    handleChange() {
        this.submitted = false;
    }

    render() {
        console.log('props', this.props);
        return (
            <FormContainer heading={"Personal Information"}>
                <form onChange={this.handleChange.bind(this)} onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                    <FormResult submitting={this.props.submitting} submitSucceeded={this.submitted}
                        submitFailed={this.props.submitFailed} submittingMessage={"Updating"}
                        submitSuccessMessage={"Updated"}
                        submitFailedMessage={"An error occured while updating. Please try again later."} />
                    <br />
                    <Field name="displayName" type="text" component={InputComponent} label="Display Name" />

                    <Field disabled={this.props.isSocial} name="email" type="email" component={InputComponent} label="Email" />

                    <Field name="address" type="text" component={InputComponent} label="Address" />

                    <button type="submit" disabled={this.props.submitting || this.props.pristine || this.props.invalid}
                        className="btn btn-primary btn-lg center-block">Save</button>
                </form>
            </FormContainer>
        );
    }
}

PersonalSignupRedux = reduxForm({
    form: 'personalSignup',
    validate: (values) => {
        const errors = {}
        if (!values.displayName) {
            errors.displayName = 'Required';
        } else if (values.displayName.length > 15) {
            errors.displayName = 'Must be 15 characters or less';
        } else if (!values.displayName.trim()) {
            errors.displayName = 'Cannot be all spaces';
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        } else if (!values.email.trim()) {
            errors.email = 'Cannot be all spaces';
        }
        return errors;
    }
})(PersonalSignupRedux);

export default connect(
    (state, ownProps) => {
        if (!state.lock.authenticated) {
            ownProps.router.push('/');
        }
        const profile = state.user.userData;
        let displayName = profile.given_name || profile.nickname;
        displayName = profile.user_metadata ? profile.user_metadata.displayName : displayName;
        return {
            initialValues: {
                email: profile.email,
                displayName: displayName,
                address: (profile.user_metadata ? profile.user_metadata.address : undefined),
            },
            userId: profile.user_id,
            isSocial: profile.identities[0].isSocial,
            userConnection: profile.identities[0].connection
        }
    },
    (dispatch) => {
        return {
            updateUser: (userId, updatedUser) => {
                return dispatch(updateUser(userId, updatedUser));
            }
        }
    }
)(PersonalSignupRedux);