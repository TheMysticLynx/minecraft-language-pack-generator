import React from "react";
import './Field.sass'

class Field extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Field">
                <p>{this.props.name}</p>
                <input type="text" onChange={(e) => {this.props.superFunc(e.target.value)}} value={this.props.value} className="small"/>
            </div>
        );
    }
}

export default Field;