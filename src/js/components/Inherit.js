import React from 'react';

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {/* <FancyBorder>JSX标签内的任何内容都将通过children属性传入FancyBorder */}
            {props.children}
        </div>
    )
}

function WelcomeDialog() {
    return (
        <Dialog 
            title="Welcome" 
            message="Thank you for visiting our spacecraft!" />
    )
}

//组件中有多个入口，这种情况下可以使用自己约定的属性而不是children
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    )
}

function Contacts(props) {
    return (
        <h2>Contacts：{props.name}</h2>
    )
}

function Chat(props) {
    return (
        <h3>Chat：{props.message}</h3>
    )
}

function App() {
    return (
        <SplitPane 
            left={
                <Contacts name="Kyle" />
            }
            right={
                <Chat message="Chat information" />
            }
        />
    )
}

//特殊实例，有时认为组件是其他组件的特殊实例
function Dialog(props) {
    return (
        <FancyBorder color="blue" >
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    )
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: ''}
    }

    handleChange = e => {
        this.setState({login: e.target.value})
    }

    handleSignUp = () => {
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    render() {
        return (
            <Dialog 
                title="Mars Exploration Program"
                message="How should we refer to you?" >
                <input 
                    value={this.state.login} 
                    onChange={this.handleChange} />
                <button 
                    onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        )
    }
}

export default class Inherit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container">
                <WelcomeDialog />
                <App />
                <SignUpDialog />
            </div>
        )
    }
}