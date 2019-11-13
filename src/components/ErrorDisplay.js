import React from "react";

class HangmanError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hangman: [
        "\xa0\xa0\xa0\xa0____\n",
        "\xa0\xa0|\xa0\xa0\xa0\xa0\xa0\xa0\xa0|\n",
        "\xa0\xa0|\xa0\xa0\xa0\xa0\xa0\xa0o\n",
        "\xa0\xa0|\xa0\xa0\xa0\xa0\xa0/|\\ \n",
        "\xa0\xa0|\xa0\xa0\xa0\xa0\xa0\xa0|\xa0\n",
        "\xa0\xa0|\xa0\xa0\xa0\xa0\xa0/\xa0\\ \n",
        "_|_\xa0\xa0\xa0\xa0\xa0\xa0",
        "\xa0\xa0\xa0\xa0|\xa0\xa0\xa0\xa0|______\n",
        "\xa0\xa0\xa0\xa0|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|\n",
        "|________|"
      ]
    };
  }

  render() {
    let index = this.state.hangman.length
    return (
      <div>
        <span>Guesses Left: {this.props.guessesLeft}</span>
        <div>
          {this.props.guessesLeft < 10 &&
            this.state.hangman.map(line => {
              console.log()
              if (index === this.props.guessesLeft ) {
                return "";
              }
              return <span key={line + index--}>{line}<br/></span>;
            })}
        </div>
      </div>
    );
  }
}

export default HangmanError;
