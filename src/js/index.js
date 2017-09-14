var css = require("../scss/app.scss");
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
//  所有React组件必须像纯函数那样使用它们的props
class Welcome extends React.Component {
    render() {
        return (
            //  当React遇到的元素时用户自定义的组件，它会将JSX属性作为单个对象传递给该组件，这个对象就是props
            <h1>Hello, {this.props.name}
                <p>it's {this.props.time}</p>
            </h1>

        )
    }
}

function Avatar(props) {
    return (
        <img src={props.user.avatarUrl} title={props.user.name} />
    )
}

function Userinfo(props) {
    //  这里props = comment.author = {avatarUrl: "", name: ""}
    return (
        <div className="user-info">
            <Avatar user={props.user} />
            <div className="username">
                {props.user.name}
            </div>
        </div>
    )
}

function Comment(props) {
    //  这里props = {text: ,date: ,author:{}}
    return (
        <div className="comment">
            <Userinfo user={props.author} />
            <div className="content">
                <p>{props.text}</p>
                <p>{props.date}</p>
            </div>

            <Welcome name="Kyle" time={new Date().toLocaleTimeString()} />
        </div>
    )
}

const comment = {
    author: {
        name: "Kyle Von",
        avatarUrl: "https://tva1.sinaimg.cn/crop.0.0.179.179.50/771d5a55gw1emwpljaw12j2050050t8o.jpg"
    },
    date: new Date().toLocaleTimeString(),
    text: "这个不错！"
}

const root = document.getElementById("root");


// ReactDOM.render(
//     <Comment text={comment.text} date={comment.date} author={comment.author} />,
//     root
// )

function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleString()}</h2>
}


//  时钟组件
class Clock extends React.Component {
    //  构造函数是唯一能够初始化this.state的地方
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            counter: 0
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        // window.fetch("https://www.v2ex.com/api/members/show.json?id=130918").then(response => response.json()).then(data => {
        //     this.setState({
        //         avatar: data.avatar_large,
        //         bio: data.bio,
        //         username: data.username,
        //         creatDate: new Date(data.created * 1000).toLocaleString(),
        //         url: data.url
        //     })
        // })
    }

    componentWillUnMount() {
        clearInterval(this.timerID);
    }

    tick() {
        //  状态更新可能是异步的，所以采用第二种方法接收一个函数，函数将接收先前的状态作为第一个参数，将需更新的值作为第二个参数
        this.setState((prevState, props) => ({
            date: new Date(),
            // props里设置更新counter的增量
            counter: prevState.counter + props.increment
        }))
    }

    prevent(e) {
        e.preventDefault();
        console.log("The link was clicked.")
    }

    render() {
        return (
            <div>
                <h1>Hello, React.</h1>
                <FormattedDate date={this.state.date} />
                <h3>let's count: {this.state.counter}</h3>
                <a href="#" onClick={this.prevent}>点击不跳转</a>

                {/* <div className="user">
                    <img src={this.state.avatar} alt=""/>
                    <p>用户名：<a href={this.state.url}>{this.state.username} </a></p>
                    <p>简介：{this.state.bio}</p>
                    <p>创建日期：{this.state.creatDate}</p>
                </div> */}
            </div>
        )
    }
}

//  使用ES6 class语法定义组件，事件处理器会成为类的一个方法
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true}

        //  This binding is necessay to make `this` work in the callback
        //this.handleClick = this.handleClick.bind(this);
    }
    handleClick = () =>{
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }))
    }
    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? "ON" : "OFF"}
            </button>
        )
    }
}


//  条件渲染
function UserGreeting(props) {
    return (
        <h1>Welcome back!</h1>
    )
}
function GuestGretting(props) {
    return (
        <h1>Please sign up.</h1>
    )
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting />;
    }
    return <GuestGretting />;
}

//  元素变量
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    )
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    )
}
// 有状态的组件
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    handleLoginClick = () => {
        this.setState({
            isLoggedIn: true
        })
    }

    handleLogoutClick = () => {
        this.setState({
            isLoggedIn: false
        })
    }

    //  三目运算符 condition ? true : false
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                <div>
                    The user is <b>{isLoggedIn ? "currently" : "not" }</b> logged in.
                </div>
                {
                    isLoggedIn ?
                    <LogoutButton onClick={this.handleLogoutClick} /> :
                    <LoginButton onClick={this.handleLoginClick} />
                }
                <Mailbox unreadMessages={messages} />
            </div>
        )
    }
}

//  与运算符 &&
class Mailbox extends React.Component {
    constructor (props){
        super(props);
    }
    //  Kyers可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化
    render () {
        const unreadMessages = this.props.unreadMessages
        return (
            <div>
                {
                    (unreadMessages.length > 0) && 
                    <div>
                        <h2>
                            你有{unreadMessages.length}条未读消息。
                        </h2>
                        {
                            unreadMessages.map((item, index) => {
                                return (
                                    <p key={index}>
                                        {item}
                                    </p>
                                )
                            })
                        }
                    </div>
                    
                        
                }
            </div>
        )
    }
}
const messages = [1, 2, 3, 4, 5];

// 阻止组件渲染,render()方法返回null并不会影响组件生命周期方法的回调
function WarningBanner(props) {
    if(!props.warn) {
        return null;
    }
    return (
        <div className="warning">
            Warning!
        </div>
    )
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWaring: true}
    }

    handleToggleClick = () => {
        this.setState(prevState => ({
            showWaring: !prevState.showWaring
        }));
    }

    render () {
        return (
            <div>
                <WarningBanner warn={this.state.showWaring} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWaring ? "Hide warning" : "Show warning"}
                </button>
                <LoginControl />
            </div>
        )
    }
}

ReactDOM.render(
    <Page />, root
)