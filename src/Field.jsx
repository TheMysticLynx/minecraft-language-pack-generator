import React from "react";
import './Field.sass'

class Field extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
        this.props.superFunc(e.target.value)
    }

    render() {
        console.log(this.props)
        return (
            <div className="Field">
                <p>{this.props.name}</p>
                <input type="text" onChange={this.onChange} value={this.state.value} className="small"/>
            </div>
        );
    }
}

export default Field;