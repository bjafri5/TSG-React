import React from 'react';
import {Link} from 'react-router';

export default class MainSelection extends React.Component {
    render() {
        return (
            <div className="container marketing">
                <div className="row selection-row gradient">
                    <div className="col-lg-6 col-md-6">
                        <Link to="/food-selection">
                            <img className="img-circle" src="https://s3-media2.fl.yelpcdn.com/bphoto/I7X79wGeFZilQQ_45MasBQ/ls.jpg" alt="Generic placeholder image"
                                alt="Generic placeholder image" width="150" height="150" />
                            <h2>Select based on food &raquo;</h2>
                        </Link>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <a>
                            <img className="img-circle" src="https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg"
                                alt="Generic placeholder image" width="150" height="150" />
                            <h2>Select based on location &raquo;</h2>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}