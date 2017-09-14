import React from "react";

//  受控组件
export default class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = event => {
        alert("A name was submitted: " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    name: 
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </label>
            </form>
        )
    }
}