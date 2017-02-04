import React from 'react';

export default class FormResult extends React.Component {

    getUpdateResult() {
        if (this.props.submitting) {
            return this.props.submittingMessage;
        } else if (this.props.submitFailed) {
            return this.props.submitFailedMessage;
        }
        return this.props.submitSuccessMessage;
    }

    getUpdateColor() {
        if (this.props.submitting || this.props.submitFailed) {
            return ' gradient-red';
        }
        return ' gradient-green';
    }

    render() {
        return (
            <div hidden={!(this.props.submitting || this.props.submitFailed || this.props.submitSucceeded)}
                className={"form-result" + this.getUpdateColor()}>{this.getUpdateResult()}</div>
        );
    }
}