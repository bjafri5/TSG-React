import React from 'react';

export default class Footer extends React.Component {

    scrollToTop(e) {
        e.preventDefault();
        let scrollTimer = setInterval(() => {
            if (window.scrollY !== 0) {
                let y = window.scrollY;
                y -= 50;
                window.scroll(window.scrollX, y);
            } else {
                clearInterval(scrollTimer);
            }
        }, 5);
    }


    render() {
        return (
            <div className="container">
                <footer>
                    <hr />
                    <p className="pull-right"><a onClick={this.scrollToTop.bind(this)}>Back to top</a></p>
                    <p className="pull-left">&copy; {new Date().getFullYear()} {this.props.brand} &middot; <a>Privacy</a> &middot; <a>Terms</a></p>
                </footer>
            </div>
        );
    }
}