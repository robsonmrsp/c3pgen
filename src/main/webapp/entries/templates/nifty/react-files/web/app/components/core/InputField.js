import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import MaskedInput from 'react-text-mask'
import HttpRequest from "../core/HttpRequest";

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
        console.log("starting with props");
        this.state = {
            invalid: false,
            validationError: '',
        }
    }

    onChangeField = (anotherChange) => {
        return (event) => {
            console.log('validando a alteraçao', event.currentTarget.value);
            const msgs = this.validatores.map((validate) => {
                return validate(event.currentTarget.value);
            })

            const isValid = msgs.join(' ,').length > 0;
            this.setState({
                invalid: isValid, validationError: msgs.join(' ,'),
            });

            anotherChange(event)
        }
    }
    cellphoneMask(raw) {
        const numbers = raw.match(/\d/g);
        let numberLength = 0;
        if (numbers) {
            numberLength = numbers.join("").length;
        }

        if (numberLength > 10) {
            return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        }
        return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }

    render = () => {
        this.validatores = this.props.validate;
        return (
            this.props.mask ?
                <span>
                    <MaskedInput
                        type={this.props.type || "text"}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        mask={this.cellphoneMask}
                        className={this.props.className || "form-control"}
                        guide={this.props.guide || false}
                        id={this.props.id || "my-personal-input-id"}
                        onBlur={this.props.onBlur}
                        onChange={this.onChangeField(this.props.onChange)}
                        text={this.props.value}
                    />
                    <HelpBlock className={this.state.invalid ? "block error-block" : "hide"}>* {this.state.validationError} </HelpBlock>
                </span>
                :
                <span>
                    <FormControl
                        type={this.props.type || "text"}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        className={this.props.className || "form-control"}
                        onBlur={this.props.onBlur}
                        onChange={this.props.onChange}
                    />
                    <HelpBlock className={this.state.invalid ? "block error-block" : "hide"}>* {this.state.validationError} </HelpBlock>
                </span>
        );
    }
}
