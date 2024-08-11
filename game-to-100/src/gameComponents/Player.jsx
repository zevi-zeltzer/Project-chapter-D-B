import { useState } from "react";
import "./player.css"

function Player(props) {
  const player = JSON.parse(localStorage.getItem(props.name));

  const [num, setNum] = useState(Math.floor(Math.random() * 100));
  const [scores, setScores] = useState(player.scores);
  const [actionCounter, setActionCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isActive, setIsActive] = useState(true);
  let i=1;

  function newGame() {
    setNum(Math.floor(Math.random() * 100));
    setActionCounter(0);
    setGameOver(false);
  }

  function quit() {
    setIsActive(false);
    props.setCurrentPlayer((props.currentPlayer+1) % props.arrPlayers.length-i);
    console.log(props.arrPlayers);
    i++;
  }

  function ifCurrent() {
    if (props.arrPlayers[props.currentPlayer] === props.name) {
      props.setCurrentPlayer(
        (props.currentPlayer + 1) % props.arrPlayers.length
      );
      return true;
    } else {
      return false;
    }
  }

  if (num === 100 && !gameOver) {
    setGameOver(true);
    player.scores.push(actionCounter);
    setScores(player.scores.join(", "));
    console.log(scores);
    localStorage.setItem(player.name, JSON.stringify(player));
  }

  return (
    <>
      {isActive && (
        <div className="player">
          <h2 className="name">hello {player.name}</h2>

          <h4 className="scores">scores: {scores} </h4>
          <h3 className="num">num: {num} </h3>
          {gameOver&&<h2 className="win">You win!!</h2>}
          <h3 className="steps">num steps: {actionCounter}</h3>
          {!gameOver && (
            <div className="butAction">
              <button

                onClick={() => {
                  if (ifCurrent()) {
                    setNum(num + 1);
                    setActionCounter(actionCounter + 1);
                  }
                }}
              >
                +1
              </button>
              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(num - 1);
                    setActionCounter(actionCounter + 1);
                  }
                }}
              >
                -1
              </button>
              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(num * 2);
                    setActionCounter(actionCounter + 1);
                  }
                }}
              >
                *2
              </button>
              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(100);
                    setActionCounter(actionCounter + 1);
                  }
                }}
              >
                100
              </button>
              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(Math.floor(num / 2));
                    setActionCounter(actionCounter + 1);
                  }
                }}
              >
                /2
              </button>
            </div>
          )}
          {gameOver && (
            <div className="butWin">
              <button onClick={newGame}>New Game</button>
              <button onClick={quit}>Quit</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Player;
