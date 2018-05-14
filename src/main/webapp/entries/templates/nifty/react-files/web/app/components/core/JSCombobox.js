import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import HttpRequest from "../core/HttpRequest";

// First, you need to create the `numberMask` with your desired configurations

export default class JSCombobox extends React.Component {
    static defaultProps = {
        idValue: "id",
        displayValue: "name",
        value: {}
    }
    constructor(props) {
        super(props);
        console.log("starting with props");
    }

    changeOption = (event) => {
        console.log(event.target.value);

        const id = event.target.value;
        let selected = {};
        this.state.values.forEach((object) => {
            const objId = "" + object[this.props.idValue];
            if (id === objId) {
                selected = object;
            }
        })
        this.props.onChange(selected);
    }
    render = () => {
        return (
            <select name={this.props.name} className={this.props.className} onChange={this.changeOption} >
                <option > -- Selecione--</option>
                {
                    this.props.values.map(item => {
                        return (
                            <option
                                key={item[this.props.idValue]}
                                value={item[this.props.idValue]}
                                selected={this.props.value[this.props.idValue] === item[this.props.idValue]}
                            >
                                {item[this.props.displayValue]}
                            </option>)
                    })
                }

            </select>
        );
    }
}
