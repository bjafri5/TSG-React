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
                            <img className="img-circle" src="https://www.zagat.com/proxy/v1.4?m=image&a=resize&url=http%3A//storage.googleapis.com/zgt-photos/0x487604cc1849430b_0xc6fde59f0456a483/fd6212ded649f7a5625a03571e35b09c.jpg&width=500&height=500&key=abbc09b7c840c10937a4db331422c98b"
                                alt="Generic placeholder image" width="150" height="150" />
                            <h2>Select based on location &raquo;</h2>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}