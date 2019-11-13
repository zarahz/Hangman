import React from "react";

class HiddenLetter extends React.Component {

    render(){
        return (
            <div>
                <input disabled placeholder={(this.props.showLetter) ? this.props.letter : ""} maxLength="1"></input>
            </div>
        )
    }
}

export default HiddenLetter;