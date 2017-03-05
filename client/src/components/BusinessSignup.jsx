import React from 'react';
import FormContainer from './FormContainer.jsx';
import InputComponent from './InputComponent.jsx';
import TextAreaComponent from './TextAreaComponent.jsx';
import { addBusiness, getBusinesses, setCurrentBusiness } from '../actions/businessActions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class BusinessSignup extends React.Component {

    componentDidMount() {
        if (!this.props.businesses) {
            this.props.getBusinesses();
        }
    }

    handleSubmit(values) {
        values.userId = this.props.userId;
        this.props.setCurrentBusiness(values.businessName);
        this.props.router.push('/menu-creation');
        return this.props.addBusiness(values);
    }

    render() {
        return (
            <FormContainer heading={"Business Information"}>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                    <br />
                    <Field name="businessName" type="text" component={InputComponent} label="Business Name" />

                    <Field name="facebookLink" type="text" component={InputComponent} label="Facebook/Website Link" />

                    <Field name="minDeliveryOrder" type="text" component={InputComponent} label="Minimum Delivery Order" />

                    <Field name="prefLocation" type="text" component={InputComponent} label="Preferred Delivery Location" />

                    <Field name="description" type="textarea" component={TextAreaComponent} rows={3} maxLength={200} label="Description" />

                    <button type="submit" disabled={
                        this.props.submitting || this.props.pristine || this.props.invalid}
                        className="btn btn-primary btn-lg center-block">Add Business</button>
                </form>
            </FormContainer>
        );
    }
}

BusinessSignup = reduxForm({
    form: 'businessSignup',
    validate: (values, props) => {
        const errors = {}
        let businessExists = false;
        if (props.businesses) {
            businessExists = !!props.businesses.find((business) => {
                if (values.businessName === business.businessName) {
                    return true;
                }
            });
        }
        if (!values.businessName) {
            errors.businessName = 'Required';
        } else if (businessExists) {
            errors.businessName = 'Business Already Exits'
        } else if (values.businessName.length > 25) {
            errors.businessName = 'Must be 25 characters or less';
        } else if (!values.businessName.trim()) {
            errors.businessName = 'Cannot be all spaces';
        }
        return errors;
    }
})(BusinessSignup);

export default connect(
    (state) => {
        return {
            userId: state.user.userData.user_id,
            businesses: state.businesses.businessesData
            // formValues: (state.form.businessSignup) ? state.form.businessSignup.values : null
        }
    },
    (dispatch) => {
        return {
            addBusiness: (business) => {
                return dispatch(addBusiness(business));
            },
            getBusinesses: (userId) => {
                return dispatch(getBusinesses(userId));
            },
            setCurrentBusiness: (business) => {
                return dispatch(setCurrentBusiness(business));
            }
        }
    }
)(BusinessSignup);