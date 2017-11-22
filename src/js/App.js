import React from "react";

class Layout extends React.Component {
    constructor(){
        super()
        this.name = "will"
    }
    
    render(){
        return (
            <h1>{this.name}</h1>
        )
    }
}

function Comment(props){
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar" 
                    src={props.author.avatarUrl}
                    alt={props.author.name}
                />
                <div className="User-info-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Content">
                <p>{props.text}</p>
                <p className="Comment-date">
                    {props.date}
                </p>
            </div>
        </div>
    )
}

const comment = {
    author:{
        avatarUrl: "https://tva3.sinaimg.cn/crop.0.63.440.440.50/78f2cc43jw8emc7t7j712j20c80frdgs.jpg",
        name: "萌娘百科的更新姬"
    },
    text: "This guy is totaly nuts.",
    date: new Date().toLocaleTimeString()
}

export default Layout;