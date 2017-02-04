import React from 'react';

export default class Carousel extends React.Component {
    render() {
        return (
            <div id="theCarousel" className="carousel carousel-full slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#theCarousel" data-slide-to="0" className="active"> </li>
                    <li data-target="#theCarousel" data-slide-to="1"> </li>
                    <li data-target="#theCarousel" data-slide-to="2"> </li>
                </ol>
                <div className="carousel-inner">
                    <div className="item active">
                        <img src="img/food-background1.jpg" />
                        <a>
                            <div className="carousel-caption gradient">
                                <h1>Recommendation 1</h1>
                                <p>Information about Recommendation 1</p>
                            </div>
                        </a>
                    </div>
                    <div className="item">
                        <img src="img/food-background2.jpg" />
                        <a>
                            <div className="carousel-caption gradient">
                                <h1>Recommendation 2</h1>
                                <p>Information about Recommendation 2</p>
                            </div>
                        </a>
                    </div>
                    <div className="item">
                        <img src="img/food-background3.jpg" />
                        <a>
                            <div className="carousel-caption gradient">
                                <h1>Recommendation 3</h1>
                                <p>Information about Recommendation 3</p>
                            </div>
                        </a>
                    </div>
                </div>
                <a className="left carousel-control" href="#theCarousel" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"> </span>
                </a>
                <a className="right carousel-control" href="#theCarousel" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                </a>
            </div>
        );
    }
}