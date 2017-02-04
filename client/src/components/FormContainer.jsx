import React from 'react';

export default class FormContainer extends React.Component {
    render() {
        return (
            <div className="container form-container">
                <div className="col-sm-8 col-sm-offset-2 signup-form gradient">
                    <h2 className="font-weight-bold centered-text">{this.props.heading}</h2>
                    {this.props.children}
                </div>
            </div>
        );
    }
}