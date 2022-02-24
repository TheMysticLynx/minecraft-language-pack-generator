import React from "react";
import './Sidebar.sass'

function FilterItem(props) {
    return (
        <>
            <input type="checkbox" name="" id={props.Key + "FilterItem"} className="toggle" onChange={(e) => {props.onChange({state: e.target.checked, value: props.name})}}/>
            <label htmlFor={props.Key + "FilterItem"}>{props.name}</label>
            <br></br>
        </>
    )
}

export default class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    onChange = (e) => {
        this.props.onChange(e);
    }

    render() {
        return (
            <div className="Sidebar">
                <div className="Sidebar-header">
                    <h1>Language Pack Generator</h1>
                </div>
                <div className="Sidebar-content">
                    <div className="Sidebar-item">
                        <h2>About</h2>
                        <p>This is a generator for minecraft pack files.</p>
                    </div>
                    <br></br>
                    <div className="Sidebar-item">
                        <h2>Send me a tip</h2>
                        <a href="https://paypal.me/KaidenHoward?country.x=US&locale.x=en_US">Send me a tip on paypal to show your appreciation.</a>
                    </div>
                    <br />
                    <br></br>
                    <div className="Sidebar-item">
                        <button className='generate' onClick={this.props.generate}>Generate</button>
                        <p>Generate and download pack.</p>
                    </div>
                    <br></br>
                    <div className="Sidebar-item">
                        <button className='import' onClick={this.props.importFile}>Import</button>
                        <p>Import a lang file.</p>
                    </div>
                    <h1>Filters</h1>
                    
                    {this.props.filters.map((e, i) => {
                        return (
                            <FilterItem name={e} Key={i} onChange={this.onChange}/>
                        )
                    })}
                </div>
            </div>
        );
    }
}
