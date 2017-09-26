import React from "react";

//  状态提升
//  React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的，这就是状态提升
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
    return (f - 32) * 5 / 9;
}
function toFahrenheit(c){
    return (c * 9 / 5) + 32
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) /1000;
    return rounded.toString();
}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: ""};
    }

    handleChange = e => {
        //this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        //const temperature = this.state.temperature;
        //状态提升
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>在{scaleNames[scale]}:中输入温度数值</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        )
    }
}

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: "", scale: "c"}
    }

    handleCelsiusChange = temperature => {
        this.setState({scale: "c", temperature});
    }

    handleFahrenheitChange = temperature => {
        this.setState({scale: "f", temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput 
                    scale="c" 
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput 
                    scale="f" 
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict 
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}