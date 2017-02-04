import React from 'react';
import FoodCard from './FoodCard.jsx';
import { connect } from 'react-redux';

class FoodSelection extends React.Component {

    getFoodRows() {
        let numOfCols = 3;
        let foodCards = this.props.foodTypes.map((food, i) => {
            return (
                <FoodCard key={i} foodName={food.foodName} foodImage={food.foodImage}
                    offset={((i + numOfCols) % numOfCols === 0) ? false : true} />
            );
        });
        let foodRows = [];
        let numOfRows = Math.ceil(foodCards.length / numOfCols);
        for (let i = 0; i < numOfRows; i++) {
            foodRows.push(
                (
                    <div key={i} className="row">
                        {foodCards.splice(0, numOfCols)}
                    </div>
                )
            );
        }
        return foodRows;
    }

    render() {
        return (
            <div className="container food-types">
                {this.getFoodRows()}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        foodTypes: state.foodTypes
    }
})(FoodSelection);
