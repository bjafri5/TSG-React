import React from 'react';

export default class SelectComponent extends React.Component {

    makeOptions() {
        if (this.props.options) {
            return this.props.options.map((option, i) => {
                return (
                    <option key={i} value={option}>{option}</option>
                )
            });
        }
        return null;
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                    <div className="form-group">
                        <label>{this.props.label}</label>
                        <select disabled={this.props.meta.submitting || this.props.disabled} className="form-control"
                            {...this.props.input} placeholder={this.props.label}>
                            <option className="hidden">-- Select an Option --</option>
                            {this.makeOptions()}
                        </select>
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