import React from 'react';
import { connect } from 'react-redux';
import MultiCarousel from './MultiCarousel.jsx';

class ProfileHeader extends React.Component {

    render() {
        return (
            <div className="jumbotron gradient">
                <div className="container">
                    <h1>Hello, {this.props.name}!</h1>
                    <hr />
                    <div id="accordion">
                        <div id="headingOne">
                            <h2>
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseRecommendations" aria-expanded="true" aria-controls="collapseOne">
                                    Recommendations For You:
                                </a>
                            </h2>
                        </div>
                        <br />
                        <div id="collapseRecommendations" className="collapse in" aria-labelledby="headingOne">
                            <div className="card-block">
                                <MultiCarousel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        const profile = state.user.userData;
        let displayName = profile.given_name || profile.nickname;
        displayName = profile.user_metadata ? profile.user_metadata.displayName : displayName;
        return {
            name: displayName
        }
    }
)(ProfileHeader);