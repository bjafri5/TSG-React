import React from 'react';
import FoodCard from './FoodCard.jsx';
import {connect} from 'react-redux';

class MultiCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfCardsPerCarousel: 4
        }
    }

    componentDidMount() {
        window.onresize = () => {
            if (window.innerWidth <= 999) {
                this.setState({numOfCardsPerCarousel: 1});
            } else if (this.state.numOfCardsPerCarousel !== 4) {
                this.setState({numOfCardsPerCarousel: 4});
            }
        }
    }

    getCarouselItems() {
        let foodCards = this.props.reccommendations.map((food) => {
            return (<FoodCard key={food.foodName} foodName={food.foodName} foodImage={food.foodImage} />)
        })
        let carouselItems = [];
        //let numOfCardsPerCarousel = (screen.width <= 768 ? 1 : 4);
        let numOfCarouselItems = Math.ceil(foodCards.length / this.state.numOfCardsPerCarousel);
        for (let i = 0; i < numOfCarouselItems; i++) {
            carouselItems.push(
                <div key={i} className={"item" + (i === 0 ? " active" : "")}>
                    {foodCards.splice(0, this.state.numOfCardsPerCarousel)}
                </div>
            );
        }
        return carouselItems;
    }

    render() {
        return (
            <div className="carousel multi-carousel slide row" data-ride="carousel" data-interval="10000" id="food-carousel">
                <div className="carousel-inner">
                    {this.getCarouselItems()}
                </div>
                <a className="left carousel-control" href="#food-carousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
                <a className="right carousel-control" href="#food-carousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right"></i></a>
            </div>
        );

    }
}

export default connect((state) => {
    return {
        reccommendations: state.foodTypes
    }
})(MultiCarousel);