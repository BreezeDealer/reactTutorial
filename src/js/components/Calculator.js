import React from "react";

//  状态提升
function BoilingVerdict(props){
    return props.celsius >= 100 ? 
    <p>水会烧开</p> :
    <p>水不会烧开</p>
}

function ShowText(props) {
    return <p>{props.content}</p>
}

const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
}

//  转换函数
function toCelsius(f) {
    return (f -32) * 5 / 9;
}
function toFahrenheit(c){
    return (c * 9 / 5) + 32
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: ""};
    }

    handleChange = e => {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
                <BoilingVerdict celsius={temperature} />
            </fieldset>
        )
    }
}

export default class Calculator extends React.Component {
   render() {
       return (
           <div>
               <TemperatureInput scale="c" />
               <TemperatureInput scale="f" />               
           </div>
       );
   }
}