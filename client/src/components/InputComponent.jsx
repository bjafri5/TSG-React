import React from 'react';

export default class InputComponent extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                    <div className="form-group">
                        <label>{this.props.label}</label>
                        <input disabled={this.props.meta.submitting || this.props.disabled} className="form-control"
                                {...this.props.input} type={this.props.type} placeholder={this.props.label} />
                        {this.props.meta.touched && ((this.props.meta.error &&
                            <strong style={{ color: 'rgb(150,0,0)' }}>
                                *{this.props.meta.error}
                            </strong>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}