import React from 'react';
import FormContainer from './FormContainer.jsx';
import InputComponent from './InputComponent.jsx';
import FormResult from './FormResult.jsx';
import { addBusiness, getBusinesses } from '../actions/businessActions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class BusinessSignup extends React.Component {

    componentDidMount() {
        if (!this.props.businesses) {
            this.props.getBusinesses(this.props.userId);
        }
    }

    doesBusinessExist() {
        if (this.props.formValues) {
            return !!this.props.businesses.find((business) => {
                if (this.props.formValues.businessName === business.businessName) {
                    return true;
                }
            });
        }
        return false;
    }

    handleSubmit(values) {
        values.userId = this.props.userId;
        return this.props.addBusiness(values);
    }

    render() {
        //console.log(this.props);
        return (
            <FormContainer heading={"Business Information"}>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                    <br />
                    <Field name="businessName" type="text" component={InputComponent} label="Business Name" />

                    <Field name="facebookLink" type="text" component={InputComponent} label="Facebook/Website Link" />

                    <Field name="minDeliveryOrder" type="text" component={InputComponent} label="Minimum Delivery Order" />

                    <Field name="prefLocation" type="text" component={InputComponent} label="Preferred Delivery Location" />

                    <Field name="description" type="textarea" component={InputComponent} label="Description" />

                    <FormResult submitting={this.props.submitting} submitSucceeded={this.props.submitSucceeded}
                        submitFailed={this.props.submitFailed} submittingMessage={"Adding Business"}
                        submitSuccessMessage={"Business Succesfully Added"}
                        submitFailedMessage={"An error occured while adding the business. Please try again later."} />

                    <button type="submit" disabled={this.doesBusinessExist() ||
                        this.props.submitting || this.props.pristine || this.props.invalid}
                        className="btn btn-primary btn-lg center-block">Add Business</button>
                </form>
            </FormContainer>
        );
    }
}

BusinessSignup = reduxForm({
    form: 'businessSignup'
})(BusinessSignup);

export default connect(
    (state) => {
        //console.log(state.form.businessSignup);
        return {
            userId: state.user.userData.user_id,
            businesses: state.businesses.businessesData,
            formValues: (state.form.businessSignup) ? state.form.businessSignup.values : null
        }
    },
    (dispatch) => {
        return {
            addBusiness: (business) => {
                return dispatch(addBusiness(business));
            },
            getBusinesses: (userId) => {
                return dispatch(getBusinesses(userId));
            }
        }
    }
)(BusinessSignup);