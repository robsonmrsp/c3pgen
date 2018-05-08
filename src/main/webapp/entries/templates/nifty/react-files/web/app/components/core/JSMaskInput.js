import React from 'react'
import Inputmask from "inputmask";

export default class JSMaskInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputField = React.createRef();
    }

    componentDidMount = () => {
        this.initField();
    }

    initField = () => {
        Inputmask("integer").mask(this.inputField.current);
    }

    render = () => {
        return (
            <input type="text" name={this.props.name} ref={this.inputField} onChange={this.props.onChange} className={this.props.className} />
        )
    }
}
