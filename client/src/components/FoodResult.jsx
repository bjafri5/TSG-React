import React from 'react';

export default class FoodResult extends React.Component {
    render() {
        return (
            <div className="row signup-row gradient centered-text">
                <div className="col-md-4 col-xs-12">
                    <img className="center-block" src={this.props.imageUrl} alt="Image" width="250px" height="250px" />
                </div>
                <div className="col-md-8 col-xs-12">
                    <h1><a>{this.props.foodName}</a></h1>
                    <h3><a>{this.props.businessName}</a></h3>
                    <h3>Rs. {this.props.price}</h3>
                    <div className="signup-info">
                        <h4>{this.props.description}</h4>
                    </div>
                </div>
            </div>
        );
    }
}