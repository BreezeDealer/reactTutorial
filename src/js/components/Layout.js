import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class Layout extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "Kyle",
            age: 24,
            title: "React Demo"
        }
    }

    changeTitle(title){
        this.setState({title});
    }

    render() {
        return (
            <div>
                <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
                <h3>Hello, {this.state.name} !</h3>
                <p>You must be {this.state.age} years old.</p>
                <Footer />
            </div>
        )
    }
}