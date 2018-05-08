import React from 'react'
import { WSASERVICE_NOT_FOUND } from 'constants';

const $ = require('jquery')

export default class JSDateTimepicker extends React.Component {
    constructor(props) {
        super(props);
        console.log("starting with props");
        this.datetimepicker = React.createRef();
    }

    componentDidMount = () => {
        this.initDatepicker();
    }

    initDatepicker = () => {
        const datePickerElement = $(this.datetimepicker.current).datetimepicker(this.props.datePickerOptions);
        datePickerElement.on('dp.change', (event) => {
            console.log(event);
            this.props.onChange({ target: this.datetimepicker.current })
        })
    }

    render = () => {
        return (
            <input type="text" name={this.props.name} ref={this.datetimepicker} onChange={this.props.onChange} className={this.props.className} />
        )
    }
}
