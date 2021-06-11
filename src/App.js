import fingers from "./fingers.png";
import "./App.css";
import React, { Component } from "react";

//5 different character sets to play with
const az = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const AZ = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const numbers09 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialChars = [
  "!",
  '"',
  "§",
  "$",
  "%",
  "&",
  "/",
  "(",
  ")",
  "=",
  "?",
  "+",
  "#",
  ",",
  ".",
  "-",
  "*",
  "'",
  ";",
  ":",
  "_",
  "@",
  "€",
  "{",
  "}",
  "[",
  "]",
  "<",
  ">",
];
const germanChars = ["ü", "ä", "ö", "ß"];

const fingerToCharBinding = [
  ["1", "!", "q", "Q", "@", "a", "A", "y", "Y", "<", ">"],
  ["2", '"', "w", "W", "s", "S", "x", "X"],
  ["3", "§", "e", "E", "€", "d", "D", "c", "C"],
  [
    "4",
    "$",
    "r",
    "R",
    "f",
    "F",
    "v",
    "V",
    "5",
    "%",
    "t",
    "T",
    "g",
    "G",
    "b",
    "B",
  ],
  [],
  [],
  [
    "6",
    "&",
    "z",
    "Z",
    "h",
    "H",
    "n",
    "N",
    "7",
    "/",
    "{",
    "u",
    "U",
    "j",
    "J",
    "m",
    "M",
  ],
  ["8", "(", "[", "i", "I", "k", "K", ",", ";"],
  ["9", ")", "]", "o", "O", "l", "L", ".", ":"],
  [
    "0",
    "=",
    "}",
    "p",
    "P",
    "ö",
    "Ö",
    "-",
    "_",
    "ß",
    "?",
    "ü",
    "Ü",
    "ä",
    "Ä",
    "+",
    "*",
    "#",
    "'",
  ],
];

//styling
const choosenCharactersButtonColor = "green";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: "",
      correctStrokes: 0,
      allStrokes: 0,
      usedCharacters: ["a", "b", "c"],
      fingersChoosen: [],
      gameStarted: false,
      azActive: false,
      AZActive: false,
      numbersActive: false,
      specialCharsActive: false,
      germanActive: false,
    };
    this.checkInput = this.checkInput.bind(this);
    this.startPauseGame = this.startPauseGame.bind(this);
    this.getArraysIntersection = this.getArraysIntersection.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.checkInput);
    document.getElementById("azButton").style.backgroundColor =
      choosenCharactersButtonColor;
    this.setState({
      azActive: true,
    });
  }

  startPauseGame() {
    var fingersdummy = [];
    fingersdummy.push(document.getElementById("finger1").checked);
    fingersdummy.push(document.getElementById("finger2").checked);
    fingersdummy.push(document.getElementById("finger3").checked);
    fingersdummy.push(document.getElementById("finger4").checked);
    fingersdummy.push(document.getElementById("finger5").checked);
    fingersdummy.push(document.getElementById("finger6").checked);
    fingersdummy.push(document.getElementById("finger7").checked);
    fingersdummy.push(document.getElementById("finger8").checked);
    fingersdummy.push(document.getElementById("finger9").checked);
    fingersdummy.push(document.getElementById("finger10").checked);

    //create all characters array
    var allSelectedChars = [];

    if (this.state.azActive === true) {
      az.forEach((e) => {
        allSelectedChars.push(e);
      });
    }

    if (this.state.AZActive === true) {
      AZ.forEach((e) => {
        allSelectedChars.push(e);
      });
    }

    if (this.state.numbersActive === true) {
      numbers09.forEach((e) => {
        allSelectedChars.push(e);
      });
    }

    if (this.state.specialCharsActive === true) {
      specialChars.forEach((e) => {
        allSelectedChars.push(e);
      });
    }

    if (this.state.germanActive === true) {
      germanChars.forEach((e) => {
        allSelectedChars.push(e);
      });
    }

    //check for fingers only

    var finalChars = [];
    for (var i = 0; i < 10; i++) {
      if (fingersdummy[i] === true) {
        var d = this.getArraysIntersection(
          allSelectedChars,
          fingerToCharBinding[i]
        );

        d.forEach((e) => {
          finalChars.push(e);
        });
      }
    }

    //final update
    this.setState({ usedCharacters: finalChars });
    this.setState({ gameStarted: true });
    this.setState({ correctStrokes: 0 });
    this.setState({ allStrokes: 0 });
    this.setState({ fingersChoosen: fingersdummy });
    this.setState({
      target: finalChars[Math.floor(Math.random() * finalChars.length)],
    });
  }

  getArraysIntersection(a1, a2) {
    return a1.filter(function (n) {
      return a2.indexOf(n) !== -1;
    });
  }

  getRandomCharacter() {
    return this.state.usedCharacters[
      Math.floor(Math.random() * this.state.usedCharacters.length)
    ];
  }

  checkInput(event) {
    if (this.validateInput(event)) {
      this.setState({ allStrokes: this.state.allStrokes + 1 });
      if (event.key === this.state.target) {
        this.setState({ correctStrokes: this.state.correctStrokes + 1 });
        this.setState({
          target:
            this.state.usedCharacters[
              Math.floor(Math.random() * this.state.usedCharacters.length)
            ],
        });
      }
    }
  }

  validateInput(event) {
    if (this.state.gameStarted !== true) return false;
    if (event.key === "Alt") return false;
    if (event.key === "AltGraph") return false;
    if (event.key === "Control") return false;
    if (event.key === "CapsLock") return false;
    if (event.key === "Shift") return false;
    if (event.key === "Enter") return false;
    if (event.key === " ") return false;
    return true;
  }

  render() {
    return (
      <div className="App">
        <div className="settings">
          Settings
          <div className="settings_menupoint">Characters</div>
          <div id="character_buttons">
            {" "}
            <button
              id="azButton"
              onClick={(event) => {
                if (
                  event.currentTarget.style.backgroundColor ===
                  choosenCharactersButtonColor
                ) {
                  event.currentTarget.style.backgroundColor = "";
                  this.setState({ azActive: false });
                } else {
                  event.currentTarget.style.backgroundColor =
                    choosenCharactersButtonColor;
                  this.setState({ azActive: true });
                }
              }}
            >
              {" "}
              a-z
            </button>
            <button
              id="AZButton"
              onClick={(event) => {
                if (
                  event.currentTarget.style.backgroundColor ===
                  choosenCharactersButtonColor
                ) {
                  event.currentTarget.style.backgroundColor = "";
                  this.setState({ AZActive: false });
                } else {
                  event.currentTarget.style.backgroundColor =
                    choosenCharactersButtonColor;
                  this.setState({ AZActive: true });
                }
              }}
            >
              {" "}
              A-Z
            </button>
            <button
              id="numbersButton"
              onClick={(event) => {
                if (
                  event.currentTarget.style.backgroundColor ===
                  choosenCharactersButtonColor
                ) {
                  event.currentTarget.style.backgroundColor = "";
                  this.setState({ numbersActive: false });
                } else {
                  event.currentTarget.style.backgroundColor =
                    choosenCharactersButtonColor;
                  this.setState({ numbersActive: true });
                }
              }}
            >
              {" "}
              0-9
            </button>
            <button
              id="specialButton"
              onClick={(event) => {
                if (
                  event.currentTarget.style.backgroundColor ===
                  choosenCharactersButtonColor
                ) {
                  event.currentTarget.style.backgroundColor = "";
                  this.setState({ specialCharsActive: false });
                } else {
                  event.currentTarget.style.backgroundColor =
                    choosenCharactersButtonColor;
                  this.setState({ specialCharsActive: true });
                }
              }}
            >
              {" "}
              !?*
            </button>
            <button
              id="germanButton"
              onClick={(event) => {
                if (
                  event.currentTarget.style.backgroundColor ===
                  choosenCharactersButtonColor
                ) {
                  event.currentTarget.style.backgroundColor = "";
                  this.setState({ germanActive: false });
                } else {
                  event.currentTarget.style.backgroundColor =
                    choosenCharactersButtonColor;
                  this.setState({ germanActive: true });
                }
              }}
            >
              {" "}
              üöä
            </button>
          </div>
          <div className="settings_menupoint">Gamemode</div>
          <div id="character_buttons">
            {" "}
            <button> Time</button>
            <button> Strokes</button>
          </div>
          <div className="settings_menupoint">Fingers</div>
          <img src={fingers} width="215" height="183"></img>
          <div> </div>
        </div>
        <div className="score">
          {this.state.correctStrokes} / {this.state.allStrokes}
        </div>
        <button id="startgame" onClick={this.startPauseGame}>
          Start game
        </button>

        <div id="targetletter">{this.state.target}</div>
        <input id="finger1" type="checkbox" defaultChecked={true} />
        <input id="finger2" type="checkbox" defaultChecked={true} />
        <input id="finger3" type="checkbox" defaultChecked={true} />
        <input id="finger4" type="checkbox" defaultChecked={true} />
        <input id="finger5" type="checkbox" defaultChecked={true} />
        <input id="finger6" type="checkbox" defaultChecked={true} />
        <input id="finger7" type="checkbox" defaultChecked={true} />
        <input id="finger8" type="checkbox" defaultChecked={true} />
        <input id="finger9" type="checkbox" defaultChecked={true} />
        <input id="finger10" type="checkbox" defaultChecked={true} />

        <div>{this.state.usedCharacters.length}</div>
      </div>
    );
  }
}

export default App;
