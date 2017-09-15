import React from "react";

//  select标签
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: "coconut"}
    }

    handleChange = e => {
        this.setState({value: e.target.value});
    }
    handleSubmit = e => {
        alert("Your favorite flavor is: " + this.state.value);
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="提交select" />
            </form>
        )
    }
}

//  textarea标签
class EasyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Please write an essay about your favorite DOM element."
        };
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    }
    handleSubmit = event => {
        alert("An essay was submitted: " + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    eassy:
                    <textarea name="" id="" cols="30" rows="10" value={this.state.value} onChange={this.handleChange} ></textarea>
                </label>
                <input type="submit" value="submit" rows="12"/>
            </form>
        )
    }
}

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        name: 
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        <input type="submit" value="Submit" />
                    </label>
                </form>
                <EasyForm />
                <FlavorForm />
                <Reservation />
            </div>
        )
    }
}

//  多个输入的解决方法
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
        console.log(this.state)
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input 
                        type="checkbox"
                        name="isGoing"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                        />
                </label>
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests" 
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}/>
                </label>
            </form>
        );
    }
}