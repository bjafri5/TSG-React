import React from 'react';

export default class FoodCard extends React.Component {
    render() {
        return (
            <div className={"food gradient col-md-" + (this.props.colLength ? this.props.colLength : 3) +
                (this.props.offset ? " col-md-offset-1" : "")}>
                <a>
                    <img className="img-responsive center-block" src={this.props.foodImage} alt={this.props.foodName} width="300px" height="300px"/>
                    <h2>{this.props.foodName}</h2>
                </a>
            </div>
        );
    }
}