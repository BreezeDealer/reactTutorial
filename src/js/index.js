var css = require("../scss/app.scss");
import React from "react";
import ReactDOM from "react-dom";
//import Layout from "./components/Layout";
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
        window.fetch("https://www.v2ex.com/api/members/show.json?id=130918").then(response => response.json()).then(data => {
            this.setState({
                avatar: data.avatar_large,
                bio: data.bio,
                username: data.username,
                creatDate: new Date(data.created * 1000).toLocaleString(),
                url: data.url
            })
        })
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

    render() {
        return (
            <div>
                <h1>Hello, React.</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
                <h3>let's count: {this.state.counter}</h3>
                <div className="user">
                    <img src={this.state.avatar} alt=""/>
                    <p>用户名：<a href={this.state.url}>{this.state.username} </a></p>
                    <p>简介：{this.state.bio}</p>
                    <p>创建日期：{this.state.creatDate}</p>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Clock increment={10} />, root
)