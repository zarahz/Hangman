import React from "react";
import "../styles/App.css";
import HiddenLetter from "./HiddenLetter";
import ErrorDisplay from "./ErrorDisplay";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      allWords: [],
      hangmanWord: null,
      letters: null,
      guessesLeft: 10,
      gameWon: false,
      letterGuessed: null
    };
    // This binding is necessary to make `this` work in the callback
    this.chooseRandomWord = this.chooseRandomWord.bind(this);
    this.checkLetter = this.checkLetter.bind(this);
    this.generateHiddenLetters = this.generateHiddenLetters.bind(this);
    this.showGameOver = this.showGameOver.bind(this);
    this.generateValidationMessage = this.generateValidationMessage.bind(this);
  }

  componentDidMount() {
    // populate words on start
    const allWords = ["You","will","never","guess","that","jazz","man"];
    this.setState({ allWords: allWords });
  }

  chooseRandomWord() {
    let randomWord = this.state.allWords[
      Math.floor(Math.random() * this.state.allWords.length)
    ].toUpperCase();
    let letters = {};
    [...randomWord].forEach(letter => {
      letters[letter] = false;
    });
    console.log(this.state.started);

    this.setState({
      hangmanWord: randomWord,
      started: true,
      guessesLeft: 10,
      letters: letters,
      gameWon: false,
      letterGuessed: null
    });
  }

  checkLetter(event) {
    let letter = event.target.value.toUpperCase();
    //this.letterInputRef.value = ""
    if (letter === "" || letter === " ") {
      return;
    }
    this.setState({letterGuessed: letter})

    if (this.state.hangmanWord.includes(letter)) {
      // letter matched
      let letters = Object.assign({}, this.state.letters);
      letters[letter] = true;
      this.checkIfGameIsWon(letters);
    } else {
      // letter did not match
      let guessesLeft = this.state.guessesLeft;
      this.setState({
        guessesLeft: --guessesLeft
      });
    }
  }

  checkIfGameIsWon(letters) {
    //check if the full word is found
    const gameWon = Object.values(letters).every(letterFound => {
      return letterFound;
    });

    if (gameWon) {
      this.setState({ gameWon: true });
    } else {
      this.setState({
        letters: letters
      });
    }
  }

  generateHiddenLetters() {
    if (!this.state.hangmanWord) {
      return [];
    }

    let hiddenLetters = [];
    // iterate each letter to show as many placeholders
    for (let index = 0; index < this.state.hangmanWord.length; index++) {
      const letter = this.state.hangmanWord[index];
      hiddenLetters.push(
        <HiddenLetter
          showLetter={this.state.letters[letter]}
          letter={letter}
          key={"HiddenLetter" + index + letter}
        ></HiddenLetter>
      );
    }
    return hiddenLetters;
  }

  showGameOver() {
    if (this.state.gameWon) {
      return <div><h1>You Won!</h1><br/><p>You Found the Word [{this.state.hangmanWord}]</p></div>;
    } else if (this.state.guessesLeft === 0) {
      return <div><h1>Game Over!</h1><br/><p>The Word you were looking for was [{this.state.hangmanWord}]</p></div>;
    }
  }

  generateValidationMessage(){
    // if true then current input is in the hangman word
    this.guessInputRef.value = ""
    return <span>
      The Letter {this.state.letterGuessed} does 
      {(this.state.letters[this.state.letterGuessed]) ?
        <b className="correctGuess"> occur</b> :
        <b className="incorrectGuess"> not occur</b>}
      </span>
  }

  render() {
    return (
      <div className="App">
        <header className="App-content">
          <h1>Hangman</h1>
          <hr />
          {!this.state.started ||
          this.state.guessesLeft === 0 ||
          this.state.gameWon ? (
            <div>
              {this.showGameOver()}
              <button onClick={this.chooseRandomWord}>Play</button>
            </div>
          ) : (
            <div>
              <div className="placeholders">
                {this.generateHiddenLetters().map(field => {
                  return field;
                })}
              </div>
              <br />
              <span>Guess a Letter: </span>
              <input
                ref={guessInputRef => this.guessInputRef = guessInputRef}
                className="guessInput"
                onChange={this.checkLetter}
                maxLength="1"
              />
              <br />
              {(this.state.letterGuessed) && this.generateValidationMessage()}
              <ErrorDisplay guessesLeft={this.state.guessesLeft}></ErrorDisplay>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
