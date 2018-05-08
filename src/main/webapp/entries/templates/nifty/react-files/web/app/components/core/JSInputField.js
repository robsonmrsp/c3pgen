import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import Inputmask from "inputmask";
import HttpRequest from "../core/HttpRequest";

const $ = require('jquery')

/* 
    usage: <JSInputField plugin="[integer, decimal, double, long, date,time,  datetime, fone, credictcart, cpf, cnpj]" config={language, rightAlign, regexMask,}onChange="xptoOnChange" className="xptoClass">
*/
export default class InputField extends React.Component {
    static defaultProps = {
        config: {},
    }
    constructor(props) {
        super(props);
        this.inputField = React.createRef();
    }

    componentDidMount = () => {
        this.initField();
    }

    initField = () => {

        if (this.props.plugin === "integer") {
            Inputmask("integer", {
                rightAlign: this.props.config.rightAlign || false,
            }).mask(this.inputField.current);
        }
        if (this.props.plugin === "long") {
            $(this.inputField.current).attr('maxlength', this.props.config.maxlength || this.props.maxLength || 18);
            Inputmask("integer").mask(this.inputField.current);
        }

        if (this.props.plugin === "decimal") {

            Inputmask('numeric', {
                radixPoint: this.props.config.radixPoint || ',',
                rightAlign: this.props.config.rightAlign || false,
                groupSeparator: this.props.config.groupSeparator || '',
                autoGroup: this.props.config.autoGroup || true,
                digits: this.props.config.digits || 2,
                digitsOptional: this.props.config.digitsOptional || true,
                placeholder: this.props.config.placeholder || '',
            }).mask(this.inputField.current);
        }

        if (this.props.plugin === "datetime") {
            const datePickerElement = $(this.inputField.current).datetimepicker({
                format: 'DD/MM/YYYY HH:mm',
                // language: this.props.config || 'pt_BR',
            });
            datePickerElement.on('dp.change', (event) => {
                console.log(event);
                this.props.onChange({ target: this.inputField.current })
            })
            Inputmask("datetime").mask(this.inputField.current);
        }
        if (this.props.plugin === "date") {
            const datePickerElement = $(this.inputField.current).datetimepicker({
                format: 'DD/MM/YYYY',
                // language: 'pt_BR',
            });
            datePickerElement.on('dp.change', (event) => {
                console.log(event);
                this.props.onChange({ target: this.inputField.current })
            })
            Inputmask("date").mask(this.inputField.current);
        }
        if (this.props.plugin === "time") {
            const datePickerElement = $(this.inputField.current).datetimepicker({
                // pickTime: true,
                format: 'HH:mm',
                pickDate: false,
                // language: 'pt_BR',
            });
            datePickerElement.on('dp.change', (event) => {
                console.log(event);
                this.props.onChange({ target: this.inputField.current })
            })
            Inputmask("hh:mm").mask(this.inputField.current);
        }

        if (this.props.plugin === "regex") {
            Inputmask({ regex: this.props.config.regex || String.raw`\d*` }).mask(this.inputField.current);
        }
    }

    render = () => {
        return (
            this.props.plugin === "textarea" ?
                <textarea rows={this.props.config.rows || 3} name={this.props.name} ref={this.inputField} value={this.props.value} onChange={this.props.onChange} className={this.props.className} />
                :
                <input type="text" name={this.props.name} ref={this.inputField} value={this.props.value} onChange={this.props.onChange} maxLength={this.props.maxLength} className={this.props.className} />
        )
    }
}

