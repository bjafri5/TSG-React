import React from 'react';
import FormContainer from './FormContainer.jsx';
import FormResult from './FormResult.jsx'
import SelectComponent from './SelectComponent.jsx';
import InputComponent from './InputComponent.jsx';
import TextAreaComponent from './TextAreaComponent.jsx';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getBusinesses, setCurrentBusiness } from '../actions/businessActions';
import { addFood, getFoods } from '../actions/foodActions';
import FoodResult from './FoodResult.jsx';
import Footer from './Footer.jsx';

class MenuCreation extends React.Component {

    componentDidMount() {
        if (!this.props.businesses) {
            this.props.getBusinesses(this.props.userId);
        }
        if (!this.props.foods) {
            this.props.getFoods(this.props.businessName);
        }
        this.scrollToTop = new Footer().scrollToTop;
    }

    handleSubmit(values) {
        this.scrollToTop();
        this.submitted = true;
        this.props.initialize({
            businessName: values.businessName
        });
        return this.props.addFood(values);
    }

    handleChange(event) {
        this.submitted = false;
    }

    componentWillReceiveProps(nextProps) {
        let nextFormData = nextProps.formData;
        let currentFormData = this.props.formData;
        if (currentFormData && currentFormData.businessName && currentFormData.businessName == nextFormData.businessName) {
            //if currently selected business has not changed
            return;
        }
        if (nextFormData && nextFormData.businessName) {
            //if currently selected business has changed, update food props with new business
            this.props.getFoods(nextFormData.businessName);
        }
    }

    render() {
        console.log('pristine', this.props.pristine);
        console.log('initialValues', this.props.initialValues);
        let formData = this.props.formData;
        return (
            <div className="container">
                <FormContainer heading={"Add Food Item"}>
                    <form onChange={this.handleChange.bind(this)} onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                        <FormResult submitting={this.props.submitting} submitSucceeded={this.submitted}
                            submitFailed={this.props.submitFailed} submittingMessage={"Adding Food Item"}
                            submitSuccessMessage={"Successfully Added Food Item"}
                            submitFailedMessage={"An error occured while adding food item. Please try again later."} />
                        <br />

                        <Field name="businessName" type="text" options={this.props.businesses} component={SelectComponent}
                            label="Business Name" />

                        <Field name="foodType" type="text" component={SelectComponent} label="Food Type" options={this.props.foodTypes} />

                        <Field name="foodName" type="text" component={InputComponent} label="Food Name" />

                        <Field name="price" type="number" component={InputComponent} label="Price (Rs.)" />

                        <Field name="imageUrl" type="url" component={InputComponent} label="Image URL" />

                        <Field name="description" type="textArea" component={TextAreaComponent} maxLength={200} rows={3}
                            label="Description" />

                        <button type="submit" disabled={this.props.submitting || this.props.pristine || this.props.invalid}
                            className="btn btn-primary btn-lg center-block">Save</button>
                    </form>
                </FormContainer>

                <hr />
                {
                    (formData) ?
                        <FoodResult foodName={formData.foodName} price={formData.price} businessName={formData.businessName}
                            description={formData.description} imageUrl={formData.imageUrl} />
                        : null
                }

            </div>
        );
    }
}

MenuCreation = reduxForm({
    form: 'menuCreation',
    validate: (values, props) => {
        const errors = {}
        let foodExists = false;
        if (props.foods) {
            foodExists = !!props.foods.find((food) => {
                if (values.foodName === food.foodName) {
                    return true;
                }
            });
        }
        if (!values.foodName) {
            errors.foodName = 'Required';
        } else if (foodExists) {
            errors.foodName = 'Food Item Already Exits'
        } else if (values.foodName.length > 25) {
            errors.foodName = 'Must be 25 characters or less';
        } else if (!values.foodName.trim()) {
            errors.foodName = 'Cannot be all spaces';
        }
        if (!values.foodType) {
            errors.foodType = 'Required';
        }
        if (!values.businessName) {
            errors.businessName = 'Required';
        }
        if (!values.price) {
            errors.price = 'Required';
        }
        return errors;
    }
})(MenuCreation);

export default connect(
    (state) => {
        let businessesData = null;
        let foodTypesData = state.foodTypes.map(foodType => foodType.foodName);
        if (state.businesses.businessesData) {
            businessesData = state.businesses.businessesData.map(business => business.businessName);
        }
        let formValues = (state.form.menuCreation) ? state.form.menuCreation.values : null;
        return {
            initialValues: {
                businessName: state.businesses.currentBusiness
            },
            userId: state.user.userData.user_id,
            foodTypes: foodTypesData,
            foods: state.foods.foodData,
            businesses: businessesData,
            formData: formValues
        }
    },
    (dispatch) => {
        return {
            setCurrentBusiness: (business) => {
                return dispatch(setCurrentBusiness(business));
            },
            getBusinesses: (userId) => {
                return dispatch(getBusinesses(userId));
            },
            getFoods: (userId) => {
                return dispatch(getFoods(userId));
            },
            addFood: (food) => {
                return dispatch(addFood(food));
            }
        }
    }
)(MenuCreation);