import React from "react";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buyItems: ["milk", "bread", "fruit"]
        }
    }

    render(){
        const {buyItems} = this.state;
        return (
           <div>
               <h1>Shopping list.</h1>
                {
                    buyItems.map(item => {
                        return <p key={item}>{item}</p>
                    })
                }
           </div>
        )
    }
}

export default App;